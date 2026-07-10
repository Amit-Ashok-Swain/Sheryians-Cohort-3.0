import React from 'react'

// const ProductCard = ({product,del}) => {
//   return (
//     <div className='p-4 border-2 rounded flex flex-col gap-4'>
//       <div className='w-50'>
//         <img src={product.image} alt={product.title.substring(0,10)} />
//       </div>
//       <div>
//         <h2 className='font-semibold'>{product.title.substring(0,30)}</h2>
//         <p className='text-xs'>{product.category}</p>
//         <p className='text-green-600'>{product.price}</p>
//       </div>
//       <div>
//         <button onClick={()=>del(product.id)} className='p-2 bg-red-500'>Delete</button>
//       </div>
//     </div>
//   )
// }

// export default ProductCard


const ProductCard = ({product,del}) => {
  return (
    <div className='w-72 h-[430px] border-2 rounded-lg p-4 flex flex-col justify-between bg-zinc-700 gap-1'>
      <div className='h-44 flex items-center justify-center'>
        <img className='max-h-full object-contain' src={product.image} alt="" />
      </div>
      <div className='p-2'>
        <h1 className='font-semibold'>Name: {product.title.substring(0,20)}</h1>
        <h2>Category: {product.category}</h2>
        <h1 className='font-bold text-green-600'>Price: ₹{product.price}</h1>
      </div>
      <div className='p-2'>
        <button onClick={()=>del(product.id)} className='p-2 bg-red-700 rounded-xl cursor-pointer'>Delete</button>
      </div>
    </div>
  )
}

export default ProductCard

