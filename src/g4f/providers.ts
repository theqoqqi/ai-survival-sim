
import providers from './providers.json';

export function getProvidersString(model: string): string {
    return getProvidersByModel(model).join(', ');
}

export function getProvidersByModel(model: string): string[] {
    return Object.entries(providers)
        .filter(([, models]) => models.includes(model))
        .map(([provider]) => provider);
}
