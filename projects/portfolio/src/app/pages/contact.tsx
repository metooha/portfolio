import { useState } from "react";
import { Button } from "@/app/components/Button/Button";
import { IconButton } from "@/app/components/IconButton/IconButton";
import { InstagramIcon, LinkedInIcon, MailIcon } from "@/app/components/Icons/SocialIcons";
import { Link } from "@/app/components/Link/Link";
import { PageContainer, TwoColumnSection } from "@/app/components/layout";
import { TextArea } from "@/app/components/TextArea/TextArea";
import { TextField } from "@/app/components/TextField/TextField";
import { Body, Heading } from "@/app/components/Text/Text";
import coffeeIllustration from "@/app/assets/pages/profile/shared/coffee-illustration.png";
import adplistMentoringCard from "@/app/assets/pages/contact/adplist-mentoring-card.png";
import adplistLogo from "@/app/assets/pages/contact/adplist-logo.png";

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Contact from ${formData.firstName} ${formData.lastName}`);
    const body = encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}\n` +
        `Email: ${formData.email}\n\n` +
        `Message:\n${formData.message}`,
    );

    window.location.href = `mailto:amytuha@pm.me?subject=${subject}&body=${body}`;
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
  };

  const updateField = (name: keyof typeof formData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((current) => ({ ...current, [name]: event.target.value }));
    };

  return (
    <div className="min-h-screen pt-16">
      <PageContainer className="py-12" maxWidth="max-w-[1220px]">
        <TwoColumnSection gap="gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Heading
                as="h1"
                size="large"
                weight="default"
                UNSAFE_className="text-5xl text-indigo-600"
              >
                Contact me.
              </Heading>
              <img src={coffeeIllustration} alt="Coffee" className="w-12 h-12" />
            </div>

            <div className="space-y-4">
              <Body as="p" size="medium">
                I'm in the Bay Area, send me a message if you'd like to chat.
              </Body>

              <Link
                href="https://drive.google.com/file/d/1Ey7f4JafSZUQ2PZdavkqzrZTLgSGfO2M/view?usp=sharing"
                target="_blank"
                UNSAFE_className="block"
              >
                Download my resume
              </Link>

              <Link
                href="https://adplist.org/mentors/amy-ha"
                target="_blank"
                UNSAFE_className="block mt-6"
              >
                <img
                  src={adplistMentoringCard}
                  alt="Join my community on ADPlist"
                  className="w-full rounded-lg hover:opacity-90 transition-opacity"
                />
              </Link>
            </div>

            <div className="flex gap-4 pt-4">
              <IconButton
                a11yLabel="Instagram"
                href="https://instagram.com"
                target="_blank"
                size="small"
                color="tertiary"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                a11yLabel="Email"
                href="mailto:amytuha@pm.me"
                size="small"
                color="tertiary"
              >
                <MailIcon />
              </IconButton>
              <IconButton
                a11yLabel="LinkedIn"
                href="https://www.linkedin.com/in/haamy/"
                target="_blank"
                size="small"
                color="tertiary"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                a11yLabel="ADPlist"
                href="https://adplist.org/mentors/amy-ha"
                target="_blank"
                size="small"
                color="tertiary"
              >
                <img src={adplistLogo} alt="" className="w-5 h-5" />
              </IconButton>
            </div>
          </div>

          <div className="min-w-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  label="First name"
                  size="small"
                  value={formData.firstName}
                  onChange={updateField("firstName")}
                  helperText="First Name (required)"
                  textFieldProps={{ name: "firstName", required: true }}
                />
                <TextField
                  label="Last name"
                  size="small"
                  value={formData.lastName}
                  onChange={updateField("lastName")}
                  helperText="Last Name (required)"
                  textFieldProps={{ name: "lastName", required: true }}
                />
              </div>

              <TextField
                label="Email"
                type="email"
                size="small"
                value={formData.email}
                onChange={updateField("email")}
                helperText="Email (required)"
                textFieldProps={{ name: "email", required: true }}
              />

              <TextArea
                label="Message"
                size="small"
                value={formData.message}
                onChange={updateField("message")}
                helperText="Message (required)"
                textAreaProps={{ name: "message", required: true, rows: 6 }}
              />

              <Button variant="primary" size="medium" type="submit" shape="pill">
                SEND
              </Button>
            </form>
          </div>
        </TwoColumnSection>
      </PageContainer>
    </div>
  );
}
