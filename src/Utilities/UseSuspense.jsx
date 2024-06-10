import { Suspense } from "react";
import { TbLoader3 } from "react-icons/tb";

const UseSuspense = (Component) => {
    const WrappedComponent = (props) => (
        <Suspense fallback={<div className="container flex items-center justify-center p-10"><TbLoader3 size={24} className=" animate-spin" /> </div>}>
            <Component {...props} />
        </Suspense>
    );

    WrappedComponent.displayName = `WithSuspense(${Component.displayName || Component.name || 'Component'})`;

    return WrappedComponent;
  
};

export default UseSuspense;