import React, { useEffect, useState } from "react";

const Tracking: React.FunctionComponent = () => {
    const [randomNumber, setRandomNumber] = useState(undefined);

    useEffect(() => {
      setRandomNumber(Math.floor(Math.random() * 100));
    }, []);

    if (!randomNumber) return null;
    
    return (
        <div style={{ visibility: 'hidden', height: 0, overflow: 'hidden', position: 'relative'}}>
            <img alt="doubleclick" width="1" height="1" style={{ position: 'absolute'}}
                 src={`https://pubads.g.doubleclick.net/activity;dc_iu=/21612525419/DFPAudiencePixel;ord=${randomNumber};dc_seg=507368552?`}
            />
            <img alt="fb" height="1" width="1" style={{ position: 'absolute'}}
                 src="https://www.facebook.com/tr?id=1650870088530325&ev=PageView&noscript=1"/>
        </div>
    )
};

export default Tracking;
