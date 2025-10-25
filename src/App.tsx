import { BrowserRouter, useLocation } from "react-router-dom";
import Router from "./router/router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Modal from "./components/modal/ModalContainer";
import Nav from "./components/layout/Nav";
import { store, persistor } from "./store/index";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./pages/Error";
import BackgroundPortal from "./components/BackgroundLayerPortal";

function App() {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
              edgeMode="duplicate"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -6"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
            <feGaussianBlur in="gooblend" stdDeviation="40" result="final" />
            <feBlend in="final" in2="final" />
          </filter>
        </defs>
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
        <defs>
          <filter
            id="glass-distortion"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            color-interpolation-filters="sRGB"
          >
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="
        0 0 0 0 0
        0 0 0 0 0
        0 0 0 0 0
        0 0 0 1 0"
              result="alpha"
            />
            <feGaussianBlur in="alpha" stdDeviation="1.1" result="softAlpha" />
            <feColorMatrix
              in="softAlpha"
              type="saturate"
              values="0"
              result="noiseMono"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noiseMono"
              scale="80"
              xChannelSelector="B"
              yChannelSelector="B"
              result="displaced"
            />

            <feSpecularLighting
              in="softAlpha"
              surfaceScale="4.5"
              specularConstant="0.18"
              specularExponent="20"
              lighting-color="#B8C9FF"
              result="spec"
            >
              <feDistantLight azimuth="135" elevation="50" />
            </feSpecularLighting>
            <feComposite
              in="spec"
              in2="alpha"
              operator="in"
              result="specMasked"
            />
            <feColorMatrix
              in="specMasked"
              type="matrix"
              values="
        0.85 0    0    0   0
        0    0.90 0    0   0
        0    0    1.05 0   0
        0    0    0    0.55 0"
              result="specTint"
            />

            <feGaussianBlur in="alpha" stdDeviation="1.8" result="shadowBlur" />
            <feOffset in="shadowBlur" dx="0" dy="1" result="shadowOffset" />
            <feComposite
              in="shadowOffset"
              in2="alpha"
              operator="arithmetic"
              k2="-1"
              k3="1"
              result="innerCut"
            />
            <feColorMatrix
              in="innerCut"
              type="matrix"
              values="
        0 0 0 0 0
        0 0 0 0 0
        0 0 0 0 0
        0 0 0 0.45 0"
              result="innerShadow"
            />

            <feGaussianBlur
              in="displaced"
              stdDeviation="0.4"
              result="glassSoft"
            />
            <feColorMatrix
              in="glassSoft"
              type="matrix"
              values="
        0.98 0    0    0   0
        0    0.98 0    0   0
        0    0    0.98 0   0
        0    0    0    1   0"
              result="glassTone"
            />
          </filter>
        </defs>
      </svg>

      {/* <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
        <defs>
          <filter id="glass-distortion">
            <feGaussianBlur stdDeviation="50" />
            <feComponentTransfer result="dispMap">
              <feFuncA
                type="discrete"
                tableValues="0 1 1 1 1 1 1 1 1"
              ></feFuncA>
            </feComponentTransfer>
            <feDisplacementMap
              in="SourceGraphic"
              in2="dispMap"
              scale="100"
              xChannelSelector="B"
              yChannelSelector="B"
            />
            <feGaussianBlur stdDeviation="1" />
          </filter>
        </defs>
      </svg> */}

      <BrowserRouter>
        <ScrollToTop />
        <ErrorBoundary fallback={<Error />}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Nav />
              <Modal />
              <BackgroundPortal />
              <Router />
            </PersistGate>
          </Provider>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;
