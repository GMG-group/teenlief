import React from 'react';
import {Text, View, StyleSheet, Image} from "react-native";
import { TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
import { vw, vh } from "react-native-css-vh-vw";
import { ScrollView } from 'react-native-gesture-handler';

const HelperInfoBottomSheet = ({ navigation, bottomSheetModalRef }) => {
	return (
		<View style={styles.container}>
			{/*들어가야 할 내용*/}
			{/*1. 프로필 사진*/}
			{/*2. 이름*/}
			{/*3. 별점*/}
			{/*4. 무엇을 지원해줄 수 있는 헬퍼인지*/}
			{/*5. 메세지 가능 여부*/}
			{/*6. 메세지 가능 시간*/}
			{/*7. 태그*/}
			{/*8. 헬퍼의 활동 사진(이건 헬퍼가 직접 올리는건가?)*/}
			{/*9. 북마크 버튼*/}

			<View style={styles.helperInfoContainer}>
				<View style={styles.helperInfo}>
					<View style={styles.profileImage}>

					</View>
					<View style={styles.helperInfoText}>
						<Text adjustsFontSizeToFit style={styles.name}>김헬퍼</Text>
						<View style={styles.helperStarContainer}>
							<Text>5.0</Text>
							<Text style={styles.helperStar}>
								★★★★★
							</Text>
							<Text>
								(119개)
							</Text>
						</View>
					</View>
				</View>

				<View style={styles.connectButton}>
					<TouchableWithoutFeedback onPress={() => console.log("연결")}>
						<Text style={{color: "#ffffff"}}>연결</Text>
					</TouchableWithoutFeedback>
				</View>
			</View>
			<ScrollView>
				<View style={styles.canHelpInfo}>
					<View style={styles.canHelpInfoText}>
						<Text style={{color: "#26c967"}}>메세지 가능</Text>
						<Text>오전 9:00부터 메세지 가능</Text>
					</View>
					<View style={styles.tag}>
						<View style={styles.tagItem}>
							<Text style={{color: 'black'}}>숙식</Text>
						</View>
						<View style={styles.tagItem}>
							<Text style={{color: 'black'}}>숙식</Text>
						</View>
						<View style={styles.tagItem}>
							<Text style={{color: 'black'}}>숙식</Text>
						</View>
					</View>
				</View>
				<View style={styles.activityImages}>
					<Image source={require("../../imageTest1.png")} style={styles.activityImage1} />
					<View style={styles.activityImageContainer}>
						<Image source={require("../../imageTest1.png")} style={styles.activityImage2} />
						<Image source={require("../../imageTest1.png")} style={styles.activityImage2} />
					</View>
				</View>
				<View>
					<Text style={{fontSize: 24}}>개요</Text>
					<View style={styles.helperContentItem}>
						<Text style={{color: "black"}}>저는 헬퍼 홍길동입니다.</Text>
					</View>
					<View style={styles.helperContentItem}>
						<Text style={{color: "black"}}>저는 헬퍼 홍길동입니다.</Text>
					</View>
					<View style={styles.helperContentItem}>
						<Text style={{color: "black"}}>저는 헬퍼 홍길동입니다.</Text>
					</View>
				</View>
				<View style={styles.review}>
					<View style={styles.reviewHeader}>
						<View style={styles.reviewHeaderLeft}>
							<Text style={{color: "#ffc107", fontSize: 30}}>5.0</Text>
							<Text style={{color: "#ffc107", fontSize: 20}}>
								★★★★★
							</Text>
							<Text>(119개)</Text>
						</View>
						<View style={styles.reviewHeaderRight}>
							<View>
								<Text>친철해요</Text>
								<Text>맛이 좋아요</Text>
								<Text>김다원해요</Text>
							</View>
							<View style={styles.reviewHeaderRightMoreButton}>
								<TouchableWithoutFeedback onPress={() => {
									navigation.navigate('Review');
									bottomSheetModalRef.current.close();
								}}>
									<Text style={{color: "#2990f6"}}>모든 리뷰 보기</Text>
								</TouchableWithoutFeedback>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		paddingRight: "5%",
		paddingLeft: "5%",
		paddingBottom: "20%",
	},
	helperInfoContainer: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		marginBottom: "5%"
	},
	helperInfo: {
		display: "flex",
		flexDirection: "row",
	},
	profileImage: {
		width: 75,
		height: 75,
		borderWidth: 1,
		borderColor: "black",
		borderRadius: 50,
	},
	helperInfoText: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "flex-start",
		marginLeft: 10,
	},
	name: {
		color: "black",
		fontSize: 20,
	},
	helperStarContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 2,
		marginTop: 5
	},
	helperStar: {
		color: "#ffc107",
		marginLeft: 5,
		marginRight: 5
	},
	connectButton: {
		width: 75,
		height: 30,
		backgroundColor: "#0b68ff",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: "auto",
		marginRight: 10,
		borderRadius: 50,
		marginTop: 10,
		marginBottom: 10,
	},
	canHelpInfo: {
		display: "flex",
		width: "70%",
		justifyContent: "space-between",
		marginTop: '3%'
	},
	canHelpInfoText: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},
	tag: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		marginTop: 10,
		marginBottom: 10,
	},
	tagItem: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: 90,
		height: 30,
		backgroundColor: "white",
		borderRadius: 50,
		marginRight: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		elevation: 3,
	},
	activityImages: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		marginTop: 20,
		marginBottom: 20
	},
	activityImageContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		marginLeft: vw(2),
		height: vw(40)
	},
	activityImage1: {
		width: vw(40),
		height: vw(40),
		borderWidth: 1,
		borderColor: "black",
		borderRadius: vw(5),
	},
	activityImage2: {
		width: vw(40),
		height: vw(19),
		borderWidth: 1,
		borderColor: "black",
		borderRadius: vw(3),
	},
	helperContentItem: {
		borderBottomWidth: 1,
		borderBottomColor: "rgba(0, 0, 0, 0.1)",
		paddingBottom: 10,
		marginTop: 10
	},
	review: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		marginTop: 20,
		marginBottom: 20
	},
	reviewHeader: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		width: "100%",
		marginBottom: 10
	},
	reviewHeaderLeft: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	reviewHeaderRight: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		marginLeft: vw(5),
		width: "100%"
	},
	reviewHeaderRightMoreButton: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "50%",
		marginTop: 10
	}
});

export default HelperInfoBottomSheet;
