import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "Ferkioui Akram",
    title: "Frontend Developer",
    bio: "Designs system architecture, builds UI, and integrates frontend with backend APIs.",
    imageUrl:
      "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600",
    linkedinUrl: "https://www.linkedin.com/in/ferkioui-akram?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    githubUrl: "#",
    emailUrl: "mailto:aa.ferkioui@ensta.edu.dz",
  },
  {
    name: "Hammouti Walid",
    title: "Backend Developer",
    bio: "Designs backend architecture, ORM structure, configurations, routes, and services using FastAPI.",
    imageUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    linkedinUrl: "https://www.linkedin.com/in/hammouti-walid-616952315?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    githubUrl: "#",
    emailUrl: "mailto: aw.hammouti@ensta.edu.dz",
  },
  {
    name: "Belouahar Sophia",
    title: "Database Developer",
    bio: "Manages database design, migrations, and ensures data integrity across all environments.",
    imageUrl:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
    linkedinUrl: "https://www.linkedin.com/in/belouahar-sophia-251589391?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    githubUrl: "#",
    emailUrl: "mailto:as.belouahar@ensta.edu.dz",
  },
  {
    name: "Bouterbag Amal",
    title: "Cryptography Developer",
    bio: "Implements cryptographic protocols including RSA, blind signatures, and secure hashing mechanisms.",
    imageUrl:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
    linkedinUrl: "https://www.linkedin.com/in/amel-bouterbag-b80266334?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    githubUrl: "#",
    emailUrl: "mailto:aa.bouterbag@ensta.edu.dz",
  },
  {
    name: "Zerguini Maylis",
    title: "Frontend Developer",
    bio: "Designs and implements user interfaces across key platform features and user workflows.",
    imageUrl:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600",
    linkedinUrl: "https://www.linkedin.com/in/maylis-zerguini-b557b3291?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    githubUrl: "#",
    emailUrl: "mailto:am.zerguini@ensta.edu.dz",
  },
];

const Team = () => {
  return (
    <section className="mt-30" id="contact">
      <div className="mx-auto flex max-w-(--breakpoint-xl) flex-col justify-center gap-14 px-6 py-8 sm:py-16 lg:flex-row lg:px-8">
        <div className="sm:max-w-sm lg:max-w-xs">
          <b className="font-semibold text-muted-foreground text-sm uppercase">
            Our team
          </b>
          <h2 className="mt-3 font-semibold text-3xl tracking-tight md:text-4xl">
            Leadership Team
          </h2>
          <p className="mt-4 text-base sm:text-lg">
            We&apos;re a team building E-voting, a secure electronic voting system powered by RSA encryption, blind signatures, and cryptographic protocols.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row-reverse sm:justify-end">
            <Button size="lg">Contribute</Button>
            <Button size="lg" variant="outline">
              About Us
            </Button>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 md:grid-cols-3 place-items-center">
          {teamMembers.map((member) => (
            <div
              className="flex items-start gap-4 md:flex-col"
              key={member.name}
            >
              <Image
                alt={member.name}
                className="h-16 w-16 shrink-0 rounded-full bg-secondary object-cover sm:h-20 sm:w-20"
                height={120}
                src={member.imageUrl}
                width={120}
              />
              <div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.title}</p>
                <p className="mt-2">{member.bio}</p>
                <div className="mt-4 flex items-center gap-2.5">
                  <Button
                    asChild
                    className="bg-accent shadow-none hover:bg-accent"
                    size="icon"
                  >
                    <Link href={member.linkedinUrl} target="_blank">
                      <FaLinkedin className="stroke-muted-foreground" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-accent shadow-none hover:bg-accent"
                    size="icon"
                  >
                    <Link href={member.githubUrl} target="_blank">
                      <FaGithub className="stroke-muted-foreground" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-accent shadow-none hover:bg-accent"
                    size="icon"
                  >
                    <a href={member.emailUrl} target="_blank">
                      <SiGmail className="stroke-muted-foreground" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
