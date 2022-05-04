import {TextureLoader, MeshStandardMaterial, RepeatWrapping, Vector2} from "three";

export class TextureManager {
  constructor () {
    this.textureLoader = null
    this.colorTexture = null
    this.alphaTexture = null
    this.normalTexture = null
    this.roughnessTexture = null
    this.metalnessTexture = null
    this.ambientOcclusionTexture = null
    this.displacementMap = null
    this.meshMaterial = null
  }

  init(path = '',
       fileNameColorTexture = '',
       fileNameAlphaTexture = '',
       fileNameNormalTexture = '', 
       fileNameRoughnessTexture = '', 
       fileNameMetalnessTexture = '', 
       fileNameAmbientOcclusionTexture = '', 
       fileNameDisplacementMap = '',
       transparent = false,
       scale = new Vector2(1, 1),
       displacementScale = 1,
       displacementBias = 0
       ) {
    this.textureLoader = new TextureLoader()
    if(fileNameColorTexture != '') {
      this.colorTexture = this.textureLoader.load(path + fileNameColorTexture)
      this.colorTexture.repeat.set(scale.x, scale.y)
      this.colorTexture.wrapS = RepeatWrapping
      this.colorTexture.wrapT = RepeatWrapping
    }
    if(fileNameAlphaTexture != '') {
      this.alphaTexture = this.textureLoader.load(path + fileNameColorTexture)
      this.alphaTexture.repeat.set(scale.x, scale.y)
      this.alphaTexture.wrapS = RepeatWrapping
      this.alphaTexture.wrapT = RepeatWrapping
    }
    if(fileNameNormalTexture != '') {
      this.normalTexture = this.textureLoader.load(path + fileNameNormalTexture)
      this.normalTexture.repeat.set(scale.x, scale.y)
      this.normalTexture.wrapS = RepeatWrapping
      this.normalTexture.wrapT = RepeatWrapping
    }
    if(fileNameRoughnessTexture != '') {
      this.roughnessTexture = this.textureLoader.load(path + fileNameRoughnessTexture)
      this.roughnessTexture.repeat.set(scale.x, scale.y)
      this.roughnessTexture.wrapS = RepeatWrapping
      this.roughnessTexture.wrapT = RepeatWrapping
    }
    if(fileNameMetalnessTexture != '') {
      this.metalnessTexture = this.textureLoader.load(path + fileNameMetalnessTexture)
      this.metalnessTexture.repeat.set(scale.x, scale.y)
      this.metalnessTexture.wrapS = RepeatWrapping
      this.metalnessTexture.wrapT = RepeatWrapping
    }
    if(fileNameAmbientOcclusionTexture != '') {
      this.ambientOcclusionTexture = this.textureLoader.load(path + fileNameAmbientOcclusionTexture)
      this.ambientOcclusionTexture.repeat.set(scale.x, scale.y)
      this.ambientOcclusionTexture.wrapS = RepeatWrapping
      this.ambientOcclusionTexture.wrapT = RepeatWrapping
    }
    if(fileNameDisplacementMap != '') {
      this.displacementMap = this.textureLoader.load(path + fileNameDisplacementMap)
      this.displacementMap.repeat.set(scale.x, scale.y)
      this.displacementMap.wrapS = RepeatWrapping
      this.displacementMap.wrapT = RepeatWrapping
    }
    this.meshMaterial = new MeshStandardMaterial({
      map: this.colorTexture,
      normalMap: this.normalTexture,
      roughnessMap: this.roughnessTexture,
      metalnessMap: this.metalnessTexture,
      aoMap: this.ambientOcclusionTexture,
      transparent: transparent,
      alphaMap: this.alphaTexture,
      displacementMap: this.displacementMap,
      displacementScale: displacementScale,
      displacementBias: displacementBias
    })
  }

  dispose() {
    this.textureLoader.dispose()
    this.colorTexture = null
    this.alphaTexture = null
    this.normalTexture = null
    this.roughnessTexture = null
    this.metalnessTexture = null
    this.ambientOcclusionTexture = null
    this.displacementMap = null
  }
}