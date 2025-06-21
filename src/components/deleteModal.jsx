import React from 'react'

export default function DeleteModal(
    {
        isOpen,
        onClose,
        onConfirm,
        title,
        description
    }
) {
    if(!isOpen) return null
  return (
    <div className='fixed inset -0 bg-black bg- opcatity-50 flex items-center justify-center z-50'>
        <div className='bg-black p-6 w-[300px]'>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
        <div>
            <button onClick={onClose}>Cancle</button>
            <button onClick={onConfirm}>Delete</button>
        </div>
    </div>
  )
}
