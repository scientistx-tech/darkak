import React from "react";

type Brand = {
    id: number;
    name: string;
  };
  
  const brands: Brand[] = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Google" },
    { id: 3, name: "Nothing" },
    { id: 4, name: "ASUS" },
    { id: 5, name: "ONE +" },
    { id: 6, name: "VIVO" },
    { id: 7, name: "TECNO" },
    { id: 8, name: "iNFINIX" },
    { id: 9, name: "REAL ME" },
    { id: 10, name: "Xiaomi" },
    { id: 11, name: "ZTE" },
    { id: 12, name: "SAMSUNG" },
    { id: 13, name: "Walton" },
    { id: 14, name: "HONOR" },
    { id: 15, name: "HUAWEI" },
    { id: 16, name: "Oppo" },
  ];
  
  // Split into 3 rows: [0-4], [5-10], [11-15]
  const rows = [
    brands.slice(0, 5),
    brands.slice(5, 11),
    brands.slice(11, 16),
  ];
  
  export default function Brands() {
    return (
      <div className="space-y-4 w-full mt-[77px]">
        {rows.map((row, index) => (
          <div
            key={index}
            className={`flex flex-wrap gap-3 w-full ${
              index === 1
                ? 'justify-center px-0'
                : 'justify-center px-4 md:px-16'
            }`}
          >
            {row.map((brand) => (
              <button
                key={brand.id}
                type="button"
                className="bg-[#E6EFFF] hover:bg-[#cad6ec] text-[#4B4E55] text-sm md:text-base font-medium rounded-full px-20 py-5"
              >
                {brand.name}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }
  




// import React from "react";

// export interface Brand {
//   id: number;
//   name: string;
// }

// const brands: Brand[] = [
//   { id: 1, name: "Apple" },
//   { id: 2, name: "Samsung" },
//   { id: 3, name: "Xiaomi" },
//   { id: 4, name: "OnePlus" },
//   { id: 5, name: "Google" },
//   { id: 6, name: "Huawei" },
//   { id: 7, name: "Oppo" },
//   { id: 8, name: "Vivo" },
//   { id: 9, name: "Motorola" },
//   { id: 10, name: "Nokia" },
//   { id: 11, name: "Realme" },
//   { id: 12, name: "Sony" },
//   { id: 13, name: "Infinix" },
//   { id: 14, name: "Tecno" },
//   { id: 15, name: "Asus" },
//   { id: 16, name: "Lenovo" },
// ];

// const Brands: React.FC = () => {
//   return (
//     <div className="p-4">
//       <ul className="grid grid-cols-5 gap-2">
//         {brands.map((brand) => (
//           <li
//             key={brand.id}
//             className="p-2 hover:bg-gray-100"
//           >
//             <button type="button" className="bg-[#E6EFFF] text-[#4B4E55] text-[16px] md:text-[20px] lg:text-[24px] xl:text-[26px] font-medium rounded-full w-[80px] md:w-[120px] lg:w-[136px] xl:w-[254px] h-[40px] md:h-[50px] lg:h-[60px] xl:h-[70px]">{brand.name}</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Brands;
