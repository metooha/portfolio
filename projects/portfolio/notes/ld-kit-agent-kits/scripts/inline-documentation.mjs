import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {glob} from 'glob';
import ts from 'typescript';

const dirName = path.dirname(fileURLToPath(import.meta.url));
const globalGuidanceFilename = path.resolve(dirName, 'component-guidance.md');

const getRelativeFilename = (filename) =>
  path.relative(path.resolve(dirName, '../'), filename);

const [definitionFilenames, documentationFilenames] = await Promise.all([
  glob(path.resolve(dirName, '../dist/types/**/*.d.ts'), {
    ignore: '**/index.d.ts',
  }),

  glob(path.resolve(dirName, '../src/**/*.md')),
]);

const nameToDocumentationFilename = new Map(
  documentationFilenames.map((documentationFilename) => [
    path.basename(documentationFilename, '.md'),
    documentationFilename,
  ])
);

const globalGuidanceContent = await fs
  .readFile(globalGuidanceFilename, 'utf-8')
  .catch(() => '');

const combineDocumentation = (documentationContent) =>
  [globalGuidanceContent.trim(), documentationContent.trim()]
    .filter(Boolean)
    .join('\n\n');

/**
 * {@see https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API}
 */
const compile = (filenames) => {
  const program = ts.createProgram(filenames, {
    esModuleInterop: true,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    noEmit: true,
    noEmitOnError: true,
  });

  const emitResult = program.emit();

  const allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  const messages = allDiagnostics.map((diagnostic) => {
    if (diagnostic.file) {
      const {line, character} = ts.getLineAndCharacterOfPosition(
        diagnostic.file,
        diagnostic.start
      );
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        '\n'
      );

      return `${getRelativeFilename(diagnostic.file.fileName)} (${line + 1},${
        character + 1
      }): ${message}`;
    }

    return ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
  });

  if (messages.length) {
    throw new Error(
      `TypeScript compilation failed: ${messages
        .map((message) => `  ${message}`)
        .join('\n')}`
    );
  }
};

await Promise.all(
  definitionFilenames.map(async (definitionFilename) => {
    const documentationFilename = nameToDocumentationFilename.get(
      path.basename(definitionFilename, '.d.ts')
    );

    if (!documentationFilename) {
      return;
    }

    const definitionContent = await fs.readFile(definitionFilename, 'utf-8');

    if (!/^ \* %DOCUMENTATION%$/m.test(definitionContent)) {
      return;
    }

    const documentationContent = await fs.readFile(
      documentationFilename,
      'utf-8'
    );

    const updatedDefinitionContent = definitionContent.replace(
      ' * %DOCUMENTATION%',
      combineDocumentation(documentationContent).replace(/^/gm, ' * ')
    );

    await fs.writeFile(definitionFilename, updatedDefinitionContent);

    console.log(
      `Inlined documentation: ${getRelativeFilename(definitionFilename)}`
    );
  })
);

/**
 * Run the TypeScript compiler on updated definition files to ensure no syntax
 * errors created by documetnation content.
 */
compile(definitionFilenames);
