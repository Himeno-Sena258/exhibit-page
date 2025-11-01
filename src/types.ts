export interface equipment {
    id: string,
    type: '堆垛机' | 'RGV' | '机械手' | '托盘输送线' | '四向车'
    status: '进行中' | '待处理' | '待审批' | '延期',
}

export interface fault {
    id: string,
    equipmentId: string,
    time: string, // 修改为string类型，格式为"X月X日"
    type: '机构故障' | '设备故障' | '电控故障' | '软件故障' | '输送超时' | '超界' | '其他',
    description?: string,
    personInCharge: string,
    duration: string,
    status: '优质' | '合格' | '待整改' | '不合格',
}

export interface bussiness {
    id: string,
    name: string,
    status: '优质' | '合格' | '待整改' | '不合格',
}

export interface chartData {
    date: string,
    target: number,
    actual: number,
}