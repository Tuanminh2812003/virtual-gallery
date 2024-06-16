import { Uniform } from 'three';
import { Effect } from 'postprocessing';

const fragmentShader = `
  uniform float aspect;
  uniform sampler2D inputBuffer;

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 velocity = vec2(0.01, 0.01); // Placeholder for velocity calculation
    vec4 color = vec4(0.0);
    for (float i = 0.0; i < 1.0; i += 0.1) {
      color += texture2D(inputBuffer, uv - velocity * i);
    }
    outputColor = color / 10.0;
  }

  void main() {
    vec4 inputColor = texture2D(inputBuffer, gl_FragCoord.xy / resolution.xy);
    mainImage(inputColor, gl_FragCoord.xy / resolution.xy, gl_FragColor);
  }
`;

class MotionBlurEffect extends Effect {
  constructor({ aspect = 1 } = {}) {
    super('MotionBlurEffect', fragmentShader, {
      uniforms: new Map([
        ['aspect', new Uniform(aspect)]
      ])
    });
  }

  update(renderer, inputBuffer, deltaTime) {
    this.uniforms.get('aspect').value = window.innerWidth / window.innerHeight;
  }
}

export default MotionBlurEffect;
