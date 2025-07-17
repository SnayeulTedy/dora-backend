import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class VisaApiService {
  async fetchVisaInfo(countryName: string): Promise<any> {
  const url = `https://travelbriefing.org/${encodeURIComponent(countryName)}?format=json`;
  try {
    const response = await axios.get(url, { timeout: 5000 }); // ← timeout optionnel
    return response.data;
  } catch (error) {
    console.error(`❌ Erreur API visa (${countryName}):`, error.code ?? error.message);
    return null;
  }
}

}
