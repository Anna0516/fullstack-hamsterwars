import { atom, RecoilState } from 'recoil'


const HamsterAtom: RecoilState<any> = atom({
  key: 'HamsterData',
  default: [],
})

export default HamsterAtom
