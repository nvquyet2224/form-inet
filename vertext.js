#define GLSLIFY 1
varying vec2 vUv; 
varying vec3 vWorldPos; 
varying vec3 vViewDir; 
varying float zPos; 
varying vec3 vFluid; 
uniform sampler2D u_fluidTex; 
uniform float u_velocity; 
uniform float u_time; 
uniform float u_random;

void main() { 
    vUv = uv;
    vViewDir = -vec3(modelViewMatrix * vec4(position, 1.0));
    vWorldPos = vec3(modelMatrix * vec4(position, 1.0)); 
    float distToCenter = distance(vec3(0.), position); \n\n\tvec3 transformedPos = position; \n\n\tfloat pinchAmount = clamp(-u_velocity * 500. * distToCenter, -400., 400.); \n\tfloat ripple = sin((position.x - position.y) * 2.9 + (-u_time + u_random * 2.) * 2. * u_random * 0.5) * 18. * (1. - abs(u_velocity)); \n\ttransformedPos.z += pinchAmount + ripple; \n\n\t#ifdef FLUID\n\t\tvec4 earlyProjection = projectionMatrix * modelViewMatrix * vec4(transformedPos, 1.0); \n\t\tvec2 screenSpace = earlyProjection.xy / earlyProjection.w * 0.5 + vec2(0.5); \n\t\tvec3 fluidColor = texture2D(u_fluidTex, screenSpace).rgb; \n\t\tvec2 fluidPos = -normalize(fluidColor.rgb).xy * 0.01; \n\t\tvFluid = fluidColor; \n\t\ttransformedPos.xy += fluidPos; \n\t#endif\n\t\n\tzPos = ripple; \n\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformedPos, 1.0); \n }