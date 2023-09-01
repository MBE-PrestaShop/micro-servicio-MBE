
import Provider from "..";
import config from "../../config";
import FormData from 'form-data';

class ProcessorProvider extends Provider {

    constructor() {
        super({
            // baseURL: config.mbeShippingUrl
        })
    }

    async createOrders(data: any) {
        const formData = new FormData();
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
        }

        return await this.post(`${config.mbeShippingUrl}`, formData, {
            headers: {
             
                'Content-Type': 'multipart/form-data',
            }
        })
      }

}

export const processorProvider = new ProcessorProvider();