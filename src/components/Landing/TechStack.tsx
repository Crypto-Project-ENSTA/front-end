import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { RiNextjsFill } from "react-icons/ri";
import { FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiReactquery } from "react-icons/si";
import { SiJira } from "react-icons/si";
import { FaPython } from "react-icons/fa";
import { SiFastapi } from "react-icons/si";
import { SiSqlalchemy } from "react-icons/si";
import { DiPostgresql } from "react-icons/di";
import { IoLogoVercel } from "react-icons/io5";
import { SiRender } from "react-icons/si";
import { FaGithub } from "react-icons/fa";


export default function TechStack() {
    return (
        <section className="bg-background py-16">
            <div className="group relative m-auto max-w-5xl px-6">
                <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
                    <Link
                        href="/"
                        className="block text-sm duration-150 hover:opacity-75">
                        <span> Check Our Tech Stack</span>

                        <ChevronRight className="ml-1 inline-block size-3" />
                    </Link>
                </div>
                <div className="group-hover:blur-xs **:fill-foreground mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14 md:grid-cols-4">
                    <div className="flex items-center">
                        <RiNextjsFill className="mx-auto h-15 w-full" />
                    </div>
                    <div className="flex items-center">
                        <FaReact className="mx-auto h-15 w-full" />
                    </div>
                    <div className="flex items-center">
                        <RiTailwindCssFill className="mx-auto h-15 w-full" />
                    </div>
                    <div className="flex items-center">
                        <SiReactquery className="mx-auto h-15 w-full" />
                    </div>
                    <div className="flex items-center">
                        <SiJira className="mx-auto h-15 w-full" />
                    </div>
                    <div className="flex items-center">
                        <FaPython className="mx-auto h-15 w-full" />
                    </div>
                    <div className="flex items-center">
                        <SiFastapi className="mx-auto h-15 w-full" />
                    </div>
                    <div className="flex items-center">
                        <SiSqlalchemy className="mx-auto h-15 w-full" />
                    </div>
                    <div className="flex items-center">
                        <DiPostgresql className="mx-auto h-15 w-full" />
                    </div>
                    <div className="flex items-center">
                        <FaGithub className="mx-auto h-15 w-full" />
                    </div>
                    <div className="flex items-center">
                        <IoLogoVercel className="mx-auto h-15 w-full" />
                    </div>
                    <div className="flex items-center">
                        <SiRender className="mx-auto h-15 w-full" />
                    </div>
                </div>
            </div>
        </section>
    )
}