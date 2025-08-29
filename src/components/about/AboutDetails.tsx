import React from 'react'

type Props = {}

const AboutDetails = (props: Props) => {
    return (
        <div className="w-full h-full flex flex-col items-start justify-start gap-3 overflow-auto text-lg ">

            <div className="flex flex-col items-start justify-center gap-1 text-primary pe-5 ">
                <p className='uppercase text-md text-secondary'>Who Am I?</p>
                <p>Hey! I'm Ashwin Kumar, a MERN stack developer based in Pune, India. I love building web apps that are functional, fun, and intuitive. I’m especially drawn to the frontend—bringing designs to life and making interfaces smooth and engaging. At the same time, I enjoy working on the backend, setting up servers, databases, and APIs to keep everything running seamlessly.</p>
            </div>

            <div className="flex flex-col items-start justify-center gap-1 text-primary pe-5">
                <p className='uppercase text-md text-secondary'>Background</p>
                <p>I’m a Computer Engineer with over a year of experience working on both professional projects and personal passion builds. Along the way, I’ve picked up UI/UX basics and enough Figma to quickly prototype ideas. I’ve also dabbled in Game Development and 3D modeling with Blender. Always curious, I’m constantly exploring new tools and sharpening my craft.</p>
            </div>

            <div className="flex flex-col items-start justify-center gap-1 text-primary pe-5">
                <p className='uppercase text-md text-secondary'>Life Outside Work</p>
                <p>Outside of coding, you’ll probably find me lost in music, a good movie, or a game. I also love being behind the camera—capturing stories through photos and frames. Anything creative with an artistic edge tends to pull me in.</p>
            </div>

        </div>
    )
}

export default AboutDetails
