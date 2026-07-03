export interface BuilderSyncOptions {
  /** Full Builder app URL that shows the ALL FILES tree. Falls back to BUILDER_URL env. */
  url?: string;
  /** Absolute path of the local file to upload. */
  localFilePath: string;
  /** Target folder path inside Builder tree, relative to ALL FILES root. */
  targetFolderPath: string;
  /** Keep browser open for manual inspection when false. */
  noInspect: boolean;
}

