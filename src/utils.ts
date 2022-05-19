function fixUrl(url: string): string {
  if(import.meta.env.MODE === 'development') {
    //ta bort console.log när du är klar
    console.log('DEV MODE')
    return 'http://localhost:1975' + url
  } else {
    //ta bort console.log när du är klar
    console.log('PRODUCTION MODE')
    return url
  }
}
export { fixUrl }

function allImgNames(imgName: string) {
  if (imgName.startsWith('https')){
    return imgName
  } else {
    return fixUrl((`/img/${imgName}`))
  }
}
export { allImgNames }
