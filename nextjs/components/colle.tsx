// {updatedItems &&
//     updatedItems.map((item: any) => (
//         <div
//             className="w-1/2 md:w-1/3 mb-10 cursor-pointer"
//             key={`${item.id}`}
//             onClick={() => {
//                 //
//                 router.push(`/collection/${item.id}`);
//             }}
//         >
//             <div className="flex justify-center">
//                 <div className="w-full">
//                     <Image
//                         src={item.imageURI}
//                         alt={item.name}
//                         width={700}
//                         height={500}
//                         className="w-[95%] max-h-[250px] rounded-lg"
//                     />
//                     <div className="flex gap-2 mt-8 justify-center italic tracking-wide ">
//                         <p className="bg-gradient-to-r from-red-900 to-black bg-clip-text text-transparent">
//                             Visit Page
//                         </p>
//                         <LinkIcon width="25" cursor="pointer" />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     ))}
