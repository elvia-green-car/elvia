import {Scene, WebGLRenderer, PerspectiveCamera, Vector2, DirectionalLight} from "three";
import { ModelsManager} from "./managers/ModelsManager";
import { TextureManager} from "./managers/TextureManager";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { Vector3 } from "three";

//import FBXLoader from "three-fbx-loader";
export class App {
  constructor(canvas) {
    this.canvas = canvas
    this.scene = null
    this.camera = null
    this.controls = null
    this.renderer = null
  

    this.models = null

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
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.camera.position.set(-300, 200, 100)
    this.camera.lookAt(0, 0, 0)
    

    this.models = new ModelsManager()
    this.models.init()

    this.models.loadHdr('assets/textures/Background/hdri/', 'studio_small_08_1k.hdr', this.scene, this.render)
    this.models.loadGltf("assets/models/Car/gltf/fond+pied_d'estale.gltf", (gltf) => {
      this.scene.add(gltf)
    })
    this.models.loadGltf('assets/models/Plants/gltf/Plante_Ivy01.gltf', (gltf) => {
      this.models.loadFbx('assets/models/Car/fbx/Configurateur_VoitureExterieur_v05.fbx', (fbx) => {
        fbx.traverse( function ( child ) {
          if(child.name === "Slot_Roof"){
            const ivy1 = gltf
            //console.log(child)
            //console.log(child.matrixWorld.elements);
            gltf.scale.set(0.01, 0.01, 0.01)
            //gltf.position.z = 1
            //console.log(gltf)
            child.add(ivy1)
            console.log(child)
          }
        })
        this.scene.add(fbx)
      })
    })
    
    



    this.dirLight = new DirectionalLight (0x9e00b0, 1)
    this.dirLight.position.set(-500, 300, 200)
    this.scene.add(this.dirLight)
    /*this.helper = new DirectionalLightHelper( this.dirLight, 5, 0xff0000 );
    this.scene.add( this.helper );*/

    this.dirLight2 = new DirectionalLight (0x0043b0, 1)
    this.dirLight2.position.set(500, 300, -200)
    this.scene.add(this.dirLight2)
    /*this.helper2 = new DirectionalLightHelper( this.dirLight2, 5, 0xff0000 );
    this.scene.add( this.helper2 );*/

    this.shadowLight = new DirectionalLight(0xd0d0d0, 1)
    this.shadowLight.position.set(-500, 300, 0)
    this.scene.add(this.shadowLight)

    this.shadowLight.castShadow = true
    this.shadowLight.shadow.mapSize.width = 2048
    this.shadowLight.shadow.mapSize.height = 2048

    const d = 50
    this.shadowLight.shadow.camera.left = -d
    this.shadowLight.shadow.camera.right = d
    this.shadowLight.shadow.camera.top = d
    this.shadowLight.shadow.camera.bottom = -d
    this.shadowLight.shadow.camera.near = 1
    this.shadowLight.shadow.camera.far = 50
    this.shadowLight.shadow.bias = 0.001


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
    this.controls.dispose()
    this.controls = null
    this.renderer = null
    this.canvas = null

    this.models.dispose()
  }
}
