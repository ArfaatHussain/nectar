import { Dimensions } from "react-native"

export const getDimensions = () => {
    const { width, height } = Dimensions.get('window');
    return { width, height };
}