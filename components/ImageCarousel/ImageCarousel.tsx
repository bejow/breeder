import { renderItem } from "./utils";
import * as React from "react";
import { ImageSourcePropType, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
 
const defaultDataWith6Colors = [
	"#B0604D",
	"#899F9C",
	"#B3C680",
	"#5C6265",
	"#F5D399",
	"#F1F1F1",
];

interface Props { images: ImageSourcePropType[]}
 
const ImageCarousel = ({images}: Props) => {
	const scrollOffsetValue = useSharedValue<number>(0);
 
	return (
		<View
			id="carousel-component"
		>
			<Carousel
				testID={"xxx"}
				loop={true}
				width={430}
				height={258}
				snapEnabled={true}
				pagingEnabled={true}
				autoPlayInterval={2000}
				data={defaultDataWith6Colors}
				defaultScrollOffsetValue={scrollOffsetValue}
				style={{ width: "100%" }}
				onScrollStart={() => {
					console.log("Scroll start");
				}}
				onScrollEnd={() => {
					console.log("Scroll end");
				}}
				onConfigurePanGesture={(g: { enabled: (arg0: boolean) => any }) => {
					"worklet";
					g.enabled(false);
				}}
				onSnapToItem={(index: number) => console.log("current index:", index)}
				renderItem={renderItem({ rounded: true, images: images })}
			/>
		</View>
	);
}
 
export default ImageCarousel;