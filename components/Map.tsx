import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { useDriverStore, useLocationStore } from "@/store";
import { calculateDriverTimes, calculateRegion, generateMarkersFromData } from "@/lib/map";
import { ActivityIndicator, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Driver, MarkerData } from "@/types/type";
import { icons } from "@/constants";
import { useFetch } from "@/lib/fetch";

export default function Map() {
    const { data: drivers, loading, error } = useFetch<Driver[]>("/(api)/driver");
    const { userLatitude, userLongitude, destinationLatitude, destinationLongitude } =
        useLocationStore();

    const { selectedDriver, setDrivers } = useDriverStore();
    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const [key, setKey] = useState(1);

    const region = calculateRegion({
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
    });

    useEffect(() => {
        setKey(key + 1);
    }, [userLatitude, userLongitude, destinationLatitude, destinationLongitude]);

    useEffect(() => {
        if (Array.isArray(drivers)) {
            if (!userLatitude || !userLongitude) return;
            const newMarkers = generateMarkersFromData({
                data: drivers,
                userLatitude,
                userLongitude,
            });

            setMarkers(newMarkers);
        }
    }, [drivers, userLatitude, userLongitude]);

    useEffect(() => {
        if (
            markers.length > 0 &&
            destinationLatitude !== undefined &&
            destinationLongitude !== undefined
        ) {
            calculateDriverTimes({
                markers,
                userLatitude,
                userLongitude,
                destinationLatitude,
                destinationLongitude,
            }).then((drivers) => {
                setDrivers(drivers as MarkerData[]);
            });
        }
    }, [markers, destinationLatitude, destinationLongitude]);

    if (loading || !userLatitude || !userLongitude) {
        return (
            <View className="flex justify-center items-center">
                <ActivityIndicator size={"large"} color={"#000"} />
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex justify-center items-center">
                <Text>Error:{error}</Text>
            </View>
        );
    }

    return (
        <View className="w-full h-full rounded-2xl">
            <MapView
                key={key}
                provider={PROVIDER_DEFAULT}
                className="w-full h-full rounded-2xl"
                tintColor="black"
                mapType="standard"
                showsPointsOfInterest={false}
                initialRegion={region}
                showsUserLocation={true}>
                {markers.map((marker, index) => (
                    <Marker
                        key={marker.id}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                        title={marker.title}
                        image={selectedDriver === +marker.id ? icons.selectedMarker : icons.marker}
                    />
                ))}
            </MapView>
        </View>
    );
}
