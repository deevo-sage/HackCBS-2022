import AsyncStorage from "@react-native-async-storage/async-storage";

export class LocalStorage {
  private static instance: LocalStorage;

  private constructor() {}

  public static getInstance() {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage();
    }
    return LocalStorage.instance;
  }

  public async getItem(key: string) {
    return JSON.parse((await AsyncStorage.getItem(key)) || "{}");
  }

  public async setItem(key: string, value: string) {
    return await AsyncStorage.setItem(key, value);
  }

  public async removeItem(key: string) {
    return await AsyncStorage.removeItem(key);
  }
}
