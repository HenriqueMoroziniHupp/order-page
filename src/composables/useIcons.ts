import LightAddressCard from '/icons/Light-address-card.svg'
import LightEnvelope from '/icons/Light-envelope.svg'
import LightEye from '/icons/Light-eye.svg'
import LightFax from '/icons/Light-fax.svg'
import LightLocationCheck from '/icons/Light-location-check.svg'
import LightPhone from '/icons/Light-phone.svg'
import LightUser from '/icons/Light-user.svg'
import InfoTip from '/icons/info-tip.svg'
import Arrow from '/icons/Arrow.svg'

export const icons = {
  addressCard: LightAddressCard,
  email: LightEnvelope,
  eye: LightEye,
  fax: LightFax,
  locationCheck: LightLocationCheck,
  phone: LightPhone,
  name: LightUser,
  infoTip: InfoTip,
  arrow: Arrow,
}

type IconName = keyof typeof icons

export const useIcons = (iconName: IconName): string => {
  return icons[iconName]
}
