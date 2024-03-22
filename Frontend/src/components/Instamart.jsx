import { useState } from "react";

import instamart from "../Image/instamart.png"


// const Section = ({ title, description, isVisible, setIsVisible }) => {

//   return (
//     <div className="p-4 m-4">
     
    

//       <h1 className="font-bold">{title}</h1>
//       {
//         isVisible ? <button onClick={() => {
         
//           setIsVisible(false);
//         }}>hide</button> :
//         <button onClick={() => {
//           setIsVisible(true);
//         }}>show</button>
//       }
//       {
//         isVisible && <p className="p-4 m-4">{description}</p>
//       }
//     </div>
//   );
// };




const Instamart = () => {
    // const [visibleSection,setVisibleSection]=useState("")
  return (
    <>
      {/* <div className="instamart">
        <img
          src="https://tse2.mm.bing.net/th?id=OIP.Rj6njWqhXc8wYTrDrNdBCQHaBm&pid=Api&P=0&h=180"
          alt="inastamart Banner"
        />
        <img
          src="https://tse4.mm.bing.net/th?id=OIP.qmiUmLNWQkmdQo6NLj6EswHaDl&pid=Api&P=0&h=180"
          alt="instamart-image"
        />
      </div> */}

      <div className="container">
      <div className="flex flex-col justify-center items-center gap-10 p-5">
        <span className='text-blue-dark font-bold text-4xl'>Coming Soon ...</span>
        <img className="w-[300px]" alt="instamert" src= {instamart} />
      </div>
    </div>

      {/* <div className="bg-green-200 m-4">
        <Section isVisible={visibleSection==="about"} setIsVisible={()=>{
        setVisibleSection("about")
        
        }}
        
          title="about section"
          description="The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.

The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum."
        />
      </div>

      <div className="bg-green-200 m-3">
        <Section isVisible={visibleSection==="support"} setIsVisible={()=>{
        setVisibleSection("support")
        }}
          title="Support section"
          description="The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.

The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum."
        />
      </div>
      <div className="bg-green-200 m-4">
        <Section isVisible={visibleSection==="career"} setIsVisible={()=>{
           setVisibleSection("career")
        }}
          title="career section"
          description="The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.

The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum."
        />
      </div> */}
    </>
  );
};

export default Instamart;




// bad practice code

// import { useState } from "react";

// const Section = ({ title ,description,isVisible,setIsVisible}) => {
//     // const [isVisible,setIsVisible]=useState(false)
//   return (
//     <div className="p-4 m-4">
//       <h1 className="font-bold">{title}</h1>
//       {
//         isVisible ? <button onClick={(()=>{
//             setIsVisible(false)
    
//           })}>hide</button> :<button onClick={(()=>{
//             setIsVisible(true)
    
//           })}>show</button>
//       }
//       {
//         isVisible && <p className="p-4 m-4">{description}</p>
//       }

   
//     </div>
//   );
// };

// const Instamart = () => {
//     const [sectionConfig,setSectionConfig]=useState({
//         AboutSection:false,
//         SupportSection:false,
//         CareerSection:false

//     })
//   return (
//     <>
//       <div className="instamart">
//         <img
//           src="https://tse2.mm.bing.net/th?id=OIP.Rj6njWqhXc8wYTrDrNdBCQHaBm&pid=Api&P=0&h=180"
//           alt="inastamart Banner"
//         />
//         <img
//           src="https://tse4.mm.bing.net/th?id=OIP.qmiUmLNWQkmdQo6NLj6EswHaDl&pid=Api&P=0&h=180"
//           alt="instamart-image"
//         />
//       </div>

//       <div className="bg-green-200 m-4">
//         <Section isVisible={sectionConfig.AboutSection} setIsVisible={()=>{
//             setSectionConfig({
//                 AboutSection:true,
//                 SupportSection:false,
//                 CareerSection:false
//             })
//         }}
//           title="about section"
//           description="The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.

// The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum."
//         />
//       </div>

//       <div className="bg-green-200 m-3">
//         <Section isVisible={sectionConfig.SupportSection} setIsVisible={()=>{
//             setSectionConfig({
//                 AboutSection:false,
//                 SupportSection:true,
//                 CareerSection:false
//             })
//         }}
//           title="Support section"
//           description="The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.

// The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum."
//         />
//       </div>
//       <div className="bg-green-200 m-4">
//         <Section isVisible={sectionConfig.CareerSection} setIsVisible={()=>{
//             setSectionConfig({
//                 AboutSection:false,
//                 SupportSection:false,
//                 CareerSection:true
//             })
//         }}
//           title="career section"
//           description="The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.

// The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum."
//         />
//       </div>
//     </>
//   );
// };

// export default Instamart;
