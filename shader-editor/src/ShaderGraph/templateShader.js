export const DefaultVertexShader = `
void main()
{
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;
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
