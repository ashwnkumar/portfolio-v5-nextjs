import React from 'react'

type Props = {
    children: React.ReactNode
}

const GridContainer = ({ children }: Props) => {
    return (
        <div className="container">

            <div className="grid grid-cols-12 auto-rows-[86.5px] gap-5 ">
                {children}
            </div>
        </div>
    )
}

export default GridContainer