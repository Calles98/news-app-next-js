"use client"; 

import React from 'react'

type Props = {
    article: Article; 
}

const ReadMoreButton = ({ article }: Props) => {


    const openInNewTab = (url: string) => {
        window.open(url, "_blank", "noreferrer"); 
    }; 
        
    return (
        <button
            onClick={() => openInNewTab(article.url)}
            className='bg-orange-400 h-10 rounded-b-lg dark-text-gray-900 hover:bg-orange-500'>
            Read More
        </button>
    )
}

export default ReadMoreButton