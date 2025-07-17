import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiCountriesService {

    async fetchAllCountries() {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all', {
                params: {
                    fields: 'name,cca2,currencies,languages,timezones,flags,region',
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des pays:', error.response?.data || error.message);
            throw error;
        }
    }
}


