import GridCard from '@/components/GridCard'
import GridContainer from '@/components/GridContainer'
import React from 'react'

type Props = {}

function page({ }: Props) {
    return (
            <GridContainer>
                <GridCard className='col-span-12 row-span-2'>
                    <p>about</p>
                </GridCard>
            </GridContainer>
    )
}

export default page