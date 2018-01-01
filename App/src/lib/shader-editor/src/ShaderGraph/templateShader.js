export const DefaultVertexShader = `
varying vec3 vNormal;
void main()
{
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  vNormal = normalize(normal);
	gl_Position = projectionMatrix * mvPosition;
}
`

export const DefaultFragmentShader = `
// same name and type as VS
varying vec3 vNormal;

void main() {

  vec3 light = vec3(0.5, 0.2, 1.0);
  light = normalize(light);
  float dProd = max(0.0,
                    dot(vNormal, light));

  gl_FragColor = vec4(vNormal,
                      1.0);  // A

}
`

export function VertexShader(code) {

}

export function FragmentShader(code) {
  return `
${code.uniforms}

void main( void ) {
	${code.main}
}
`
}
