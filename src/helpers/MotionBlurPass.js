import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

const MotionBlurShader = {
    uniforms: {
        tDiffuse: { value: null },
        uVelocity: { value: 0.5 },
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uVelocity;
        varying vec2 vUv;
        void main() {
            vec4 color = texture2D(tDiffuse, vUv);
            vec2 offset = vec2(uVelocity * (vUv.x - 0.5), uVelocity * (vUv.y - 0.5));
            gl_FragColor = texture2D(tDiffuse, vUv + offset);
        }
    `
};

class MotionBlurPass extends ShaderPass {
    constructor() {
        super(MotionBlurShader);
    }
}

export { MotionBlurPass };
