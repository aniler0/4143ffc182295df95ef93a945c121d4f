import { HealthStatusEnum } from "@/types/fish"

export function getHealthStatusText(status: HealthStatusEnum): string {
    switch (status) {
        case HealthStatusEnum.Critical:
            return 'Critical'
        case HealthStatusEnum.Normal:
            return 'Normal'
        case HealthStatusEnum.Healty:
            return 'Healthy'
    }
}