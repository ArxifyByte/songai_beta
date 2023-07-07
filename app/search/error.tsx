"use client";

import Box from "@/components/Box";

const Error = () => {
  return ( 
    <Box className="h-full flex items-center justify-center">
      <div className="text-neutral-400">
        Ha ocurrido un error, vuelve a intentarlo más tarde.
      </div>
    </Box>
  );
}
 
export default Error;
