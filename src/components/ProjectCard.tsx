import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type Props = {
    project: {
        [key: string]: any;
    };
}

const ProjectCard = ({ project }: Props) => {
    return (
        <Link href={`/projects/${project.id}`} className="group w-full h-full flex flex-col items-start justify-start ">
            <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg">
                <Image
                    src={project.images[0].src}
                    alt={project.images[0].alt}
                    fill
                    className="object-cover transition-transform duration-600 group-hover:scale-103"
                />
            </div>
            <div className="flex items-center justify-between w-full mt-4 group-hover:bg-brand-faded px-4 py-2 rounded-lg">
                <div className="flex flex-col items-start justify-center">
                    <h3 className="text-xl md:text-2xl font-semibold text-primary group-hover:text-brand transition-colors">
                        {project.title}
                    </h3>
                    <p className='pe-4'>{project.subTitle}</p>
                </div>
                <span className="group-hover:bg-brand group-hover:text-bg group-hover:rotate-45 transition-all duration-300 rounded-full border border-border">
                    <ArrowUpRight size={32} />
                </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
                {project.stack.map((tech: string) => (
                    <span
                        key={tech}
                        className="text-sm font-medium  rounded-lg  px-3 py-1 border border-border"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </Link>
    )
}

export default ProjectCard