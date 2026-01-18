import { View, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const LocationSearch = () => {
    return (
        <>

            <GooglePlacesAutocomplete
                placeholder="Search location"
                fetchDetails={true}
                onPress={(data, details = null) => {
                    const lat = details.geometry.location.lat;
                    const lng = details.geometry.location.lng;

                    console.log(lat, lng);
                }}
                query={{
                    key: 'AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao',
                    language: 'en',
                }}
                styles={{
                    container: { flex: 0, width: '80%' },
                    textInput: {
                        backgroundColor: '#fff',
                        borderRadius: 12,
                        padding: 14,
                        borderWidth: 1,
                        borderColor: '#53B175',
                    },
                    listView: {
                        borderRadius: 12,
                    },
                }}
            />
        </>
    )
}

export default LocationSearch