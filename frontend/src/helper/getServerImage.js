import { FLASK_PORT } from "../constants/portConstants";

export function getFLASKPORTImage(imagePath) {
  return `${FLASK_PORT}static/${imagePath}`;
}

export function getLocalImage(imagePath) {
  return require(`../assets/img/${imagePath}`);
}

export function setImage(img) {
  if (img === "") {
    return getLocalImage("default.png");
  }
  
  if (img) {
    if (img instanceof Blob) {
      return URL.createObjectURL(img);
    } else {
      return getFLASKPORTImage(img);
    }
  }
}
