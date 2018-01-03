export const DefaultVertexShader = `
varying vec3 vNormal;
varying vec3 vColor;
varying vec3 vPosition;
varying vec2 vUV;
varying vec2 vScreenPosition;
void main()
{
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  vNormal = normalize(normal);
	vColor = color;
	vPosition = position;
	vUV = uv;
	gl_Position = projectionMatrix * mvPosition;
	vScreenPosition = gl_Position.xy;
}
`

export const DefaultFragmentShader = `
varying vec3 vNormal;
varying vec3 vColor;
varying vec3 vPosition;
varying vec2 vUV;
varying vec2 vScreenPosition;
void main() {

  vec3 light = vec3(0.5, 0.2, 1.0);
  light = normalize(light);
  float dProd = max(0.0,
                    dot(vNormal, light));

  gl_FragColor = vec4((0.5+0.5*dProd)*vColor,
                      1.0);  // A

}
`

export function VertexShader(code) {

}

export function FragmentShader(code) {
  return `
${code.uniforms}
varying vec3 vNormal;
varying vec3 vColor;
varying vec3 vPosition;
varying vec2 vUV;
varying vec2 vScreenPosition;
void main( void ) {
	${code.main}
}
`
}
