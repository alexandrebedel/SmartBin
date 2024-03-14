import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faWineBottle, faBottleWater, faAppleWhole } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

export default function HomeScreen() {
    return (
        <View style={{ flex: 1, paddingHorizontal: 15, backgroundColor: 'white' }}>
            <StatusBar style="auto" />
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ marginTop: 30, marginBottom: 60 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                        <Text style={styles.SimpleText}>Fill Level</Text>
                        <Text style={styles.SimpleText}>80% full</Text>
                    </View>
                    <Progress.Bar progress={0.8} width={null} color='black' height={8} />
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, marginBottom: 30 }}>
                        <Text style={styles.SimpleText}>Status</Text>
                        <Text style={styles.SimpleText}>Full</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.SimpleText}>Products Recycled</Text>
                        <Text style={styles.SimpleText}>20 items</Text>
                    </View>
                    <View>
                        <LineChart
                            data={{
                                labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
                                datasets: [
                                    {
                                        data: [
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                        ]
                                    }
                                ],
                            }}
                            width={Dimensions.get("window").width} // from react-native
                            height={220}
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "white",
                                backgroundGradientFrom: "white",
                                backgroundGradientTo: "white",
                                decimalPlaces: 0, // optional, defaults to 2dp
                                color: (opacity = 1) => "lightseagreen",
                                labelColor: (opacity = 1) => `black`,
                                style: {
                                    borderRadius: 16,
                                },
                            }}
                            withInnerLines={false}
                            withOuterLines={false}
                            withDots={false}
                            bezier
                            style={{
                                marginTop: 30,
                                alignSelf: 'center',
                                marginLeft: -30
                            }}
                            fromZero={true}
                        />
                    </View>
                    <Text style={styles.SectionTitle}>
                        Recycling Summary
                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, marginBottom: 18 }}>
                        <TouchableOpacity style={styles.CardContainer}>
                            <FontAwesomeIcon icon={faWineBottle} size={22} />
                            <Text style={styles.CardTitle}>Glass Items</Text>
                            <Text style={styles.CardText}>5 items</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.CardContainer}>
                            <FontAwesomeIcon icon={faBottleWater} size={22} />
                            <Text style={styles.CardTitle}>Plastic Items</Text>
                            <Text style={styles.CardText}>8 items</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.CardContainer}>
                        <FontAwesomeIcon icon={faAppleWhole} size={22} />
                        <Text style={styles.CardTitle}>Other Items</Text>
                        <Text style={styles.CardText}>7 items</Text>
                    </TouchableOpacity>
                    <Text style={styles.SectionTitle}>Status</Text>
                    <View style={styles.StatusSections}>
                        <View style={styles.StatusIcons} >
                            <FontAwesomeIcon icon={faTrashCan} size={20} />
                        </View>
                        <View>
                            <Text style={styles.SimpleText}>Glass Container</Text>
                            <Text style={styles.CardText}>The bin is 70% full</Text>
                            <Text style={styles.CardText}>Last item recolted: 07/03/2024</Text>
                        </View>
                    </View>
                    <View style={styles.StatusSections}>
                        <View style={styles.StatusIcons} >
                            <FontAwesomeIcon icon={faTrashCan} size={20} />
                        </View>
                        <View>
                            <Text style={styles.SimpleText}>Plastic Container</Text>
                            <Text style={styles.CardText}>The bin is 40% full</Text>
                            <Text style={styles.CardText}>Last item recolted: 03/03/2024</Text>
                        </View>
                    </View>
                    <View style={styles.StatusSections}>
                        <View style={styles.StatusIcons} >
                            <FontAwesomeIcon icon={faTrashCan} size={20} />
                        </View>
                        <View>
                            <Text style={styles.SimpleText}>Other Items Container</Text>
                            <Text style={styles.CardText}>The bin is 20% full</Text>
                            <Text style={styles.CardText}>Last item recolted: 06/03/2024</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    SimpleText: {
        fontFamily: 'Quicksand_500Medium',
        fontSize: 18,
    },
    CardTitle: {
        fontFamily: 'Quicksand_700Bold',
        fontSize: 18,
        marginBottom: 5,
        marginTop: 10,
    },
    CardText: {
        fontFamily: 'Quicksand_500Medium',
        fontSize: 16,
        color: 'grey',
    },
    CardContainer: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
        padding: 15,
        width: '48%',
    },
    SectionTitle: {
        fontFamily: 'Quicksand_700Bold', fontSize: 22,
        marginTop: 40
    },
    StatusSections: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'flex-start',
        gap: 10
    },
    StatusIcons: {
        backgroundColor: '#F2F5F1',
        padding: 15,
        borderRadius: 5
    }
});
