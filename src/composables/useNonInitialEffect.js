import { useEffect, useRef } from "react";
import PropTypes from 'prop-types'

export const useNonInitialEffect = (effect, deps) => {
    const initialRender = useRef(true);

    useEffect(()=>{
        let effectReturns = () => {};
        
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            effectReturns = effect();
        }
        if (effectReturns && typeof effectReturns === "function") {
            return effectReturns;
        }

    }, deps)
};

useNonInitialEffect.propTypes = {
    effect: PropTypes.func,
    dept: PropTypes.array
}
