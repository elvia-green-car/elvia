import {Scene, WebGLRenderer, PerspectiveCamera} from "three";

//import FBXLoader from "three-fbx-loader";
export class App {
  constructor(canvas) {
    this.canvas = canvas
    this.scene = null
    this.camera = null
    this.renderer = null

    console.log("New App created")
  }

  // Initialization
  init() {
    console.log("App init")
    this.scene = new Scene()

    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    })
    this.renderer.autoClear = false
    this.renderer.shadowMap.enabled = true

    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))

    const gl = this.renderer.getContext()
    const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
    this.camera = new PerspectiveCamera(90, aspect, 0.01, 1000)

    this.camera.position.set(-3, 2, 1)
    this.camera.lookAt(0, 0, 0)
  }

  resizeRendererToDisplaySize() {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    const needResize = this.canvas.width !== width || this.canvas.height !== height
    if (needResize) {
      this.renderer.setSize(width, height, false)
    }
    return needResize
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this))

    // Update ...
    if (this.resizeRendererToDisplaySize()) {
      const gl = this.renderer.getContext()
      this.camera.aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
      this.camera.updateProjectionMatrix()
    }

    if ( this.mixer ) this.mixer.update( delta );

    // Render ...
    this.render()
  }

  // Run app, load things, add listeners, ...
  run() {
    console.log("App run")
    this.animate()
  }

  // Memory management
  destroy() {
    this.scene = null
    this.camera = null
    this.renderer = null
    this.canvas = null
  }
}
