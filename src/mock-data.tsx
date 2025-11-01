import { type equipment, type fault, type bussiness, type chartData } from '@/types';

/**
 * 设备模拟数据
 * 总计68条数据，按要求分配状态和类型
 * 状态分布：进行中46个，待处理12个，待审批2个，延期8个
 * 设备类型：堆垛机占1/3（23个），其余类型随机分配
 */
export const mockEquipmentStatusList: equipment[] = [
  // 进行中的设备 (46个)
  { id: 'SB-ZC-01', type: '堆垛机', status: '进行中' },
  { id: 'SB-ZC-02', type: 'RGV', status: '进行中' },
  { id: 'SB-ZC-03', type: '堆垛机', status: '进行中' },
  { id: 'SB-ZC-04', type: '机械手', status: '进行中' },
  { id: 'SB-ZC-05', type: '堆垛机', status: '进行中' },
  { id: 'SB-ZC-06', type: '托盘输送线', status: '进行中' },
  { id: 'SB-ZC-07', type: '堆垛机', status: '进行中' },
  { id: 'SB-ZC-08', type: '四向车', status: '进行中' },
  { id: 'SB-ZC-09', type: '堆垛机', status: '进行中' },
  { id: 'SB-ZC-10', type: 'RGV', status: '进行中' },
  { id: 'SB-ZC-11', type: '堆垛机', status: '进行中' },
  { id: 'SB-ZC-12', type: '机械手', status: '进行中' },
  { id: 'SB-ZC-13', type: '堆垛机', status: '进行中' },
  { id: 'SB-ZC-14', type: '托盘输送线', status: '进行中' },
  { id: 'SB-ZC-15', type: '堆垛机', status: '进行中' },
  { id: 'SB-ZC-16', type: '四向车', status: '进行中' },
  { id: 'SB-ZC-17', type: '堆垛机', status: '进行中' },
  { id: 'SB-ZC-18', type: 'RGV', status: '进行中' },
  { id: 'SB-ZC-19', type: '堆垛机', status: '进行中' },
  { id: 'SB-ZC-20', type: '机械手', status: '进行中' },
  { id: 'SB-ZC-21', type: '堆垛机', status: '进行中' },
  { id: 'SB-ZC-22', type: '托盘输送线', status: '进行中' },
  { id: 'SB-ZC-23', type: '堆垛机', status: '进行中' },
  { id: 'SB-ZC-24', type: '四向车', status: '进行中' },
  { id: 'SB-ZC-25', type: '堆垛机', status: '进行中' },
  { id: 'SB-ZC-26', type: 'RGV', status: '进行中' },
  { id: 'SB-ZC-27', type: '堆垛机', status: '进行中' },
  { id: 'SB-ZC-28', type: '机械手', status: '进行中' },
  { id: 'SB-ZC-29', type: '堆垛机', status: '进行中' },
  { id: 'SB-ZC-30', type: '托盘输送线', status: '进行中' },
  { id: 'SB-ZC-31', type: '堆垛机', status: '进行中' },
  { id: 'SB-ZC-32', type: '四向车', status: '进行中' },
  { id: 'SB-ZC-33', type: '堆垛机', status: '进行中' },
  { id: 'SB-ZC-34', type: 'RGV', status: '进行中' },
  { id: 'SB-ZC-35', type: '堆垛机', status: '进行中' },
  { id: 'SB-ZC-36', type: '机械手', status: '进行中' },
  { id: 'SB-ZC-37', type: '堆垛机', status: '进行中' },
  { id: 'SB-ZC-38', type: '托盘输送线', status: '进行中' },
  { id: 'SB-ZC-39', type: '堆垛机', status: '进行中' },
  { id: 'SB-ZC-40', type: '四向车', status: '进行中' },
  { id: 'SB-ZC-41', type: 'RGV', status: '进行中' },
  { id: 'SB-ZC-42', type: '机械手', status: '进行中' },
  { id: 'SB-ZC-43', type: '托盘输送线', status: '进行中' },
  { id: 'SB-ZC-44', type: '四向车', status: '进行中' },
  { id: 'SB-ZC-45', type: 'RGV', status: '进行中' },
  { id: 'SB-ZC-46', type: '机械手', status: '进行中' },

  // 待处理的设备 (12个)
  { id: 'SB-ZC-47', type: '堆垛机', status: '待处理' },
  { id: 'SB-ZC-48', type: 'RGV', status: '待处理' },
  { id: 'SB-ZC-49', type: '堆垛机', status: '待处理' },
  { id: 'SB-ZC-50', type: '机械手', status: '待处理' },
  { id: 'SB-ZC-51', type: '托盘输送线', status: '待处理' },
  { id: 'SB-ZC-52', type: '四向车', status: '待处理' },
  { id: 'SB-ZC-53', type: '堆垛机', status: '待处理' },
  { id: 'SB-ZC-54', type: 'RGV', status: '待处理' },
  { id: 'SB-ZC-55', type: '机械手', status: '待处理' },
  { id: 'SB-ZC-56', type: '托盘输送线', status: '待处理' },
  { id: 'SB-ZC-57', type: '四向车', status: '待处理' },
  { id: 'SB-ZC-58', type: 'RGV', status: '待处理' },

  // 待审批的设备 (2个)
  { id: 'SB-ZC-59', type: '机械手', status: '待审批' },
  { id: 'SB-ZC-60', type: '托盘输送线', status: '待审批' },

  // 延期的设备 (8个)
  { id: 'SB-ZC-61', type: '四向车', status: '延期' },
  { id: 'SB-ZC-62', type: 'RGV', status: '延期' },
  { id: 'SB-ZC-63', type: '机械手', status: '延期' },
  { id: 'SB-ZC-64', type: '托盘输送线', status: '延期' },
  { id: 'SB-ZC-65', type: '四向车', status: '延期' },
  { id: 'SB-ZC-66', type: 'RGV', status: '延期' },
  { id: 'SB-ZC-67', type: '机械手', status: '延期' },
  { id: 'SB-ZC-68', type: '托盘输送线', status: '延期' },
]

/**
 * 待处理模拟数据生成函数
 * 生成最近7天的150条待处理数据，满足以下要求：
 * 1. 每天待处理数量不同，有明显差距
 * 2. 待处理类型分布：设备待处理最多，其他最少
 * 3. 负责人：张三、李四、王五
 * 4. 状态：已完成最多，但至少40条为剩余或预实差
 */
function generateMockFaultData(): fault[] {
  const faultTypes: Array<'机构故障' | '设备故障' | '电控故障' | '软件故障' | '输送超时' | '超界' | '其他'> = 
    ['机构故障', '设备故障', '电控故障', '软件故障', '输送超时', '超界', '其他'];
  
  const persons = ['张三', '李四', '王五'];
  const statuses: Array<'优质' | '合格' | '待整改' | '不合格'> = ['优质', '合格', '待整改', '不合格'];
  
  // 设备待处理类型权重分布（设备待处理最多，其他最少）
  const faultTypeWeights = {
    '设备待处理': 40,    // 40%
    '电控待处理': 20,    // 20%
    '机构待处理': 15,    // 15%
    '软件待处理': 10,    // 10%
    '输送超时': 8,     // 8%
    '超界': 5,         // 5%
    '其他': 2          // 2%
  };

  // 每天的待处理数量分布（总共150条，7天，差距明显）
  const dailyFaultCounts = [35, 8, 25, 12, 30, 18, 22]; // 总计150条
  
  // 状态分布：已完成110条，剩余25条，预实差15条
  const statusDistribution = {
    '优质': 110,
    '合格': 25,
    '待整改': 15,
    '不合格': 10
  };

  const faults: fault[] = [];
  let faultIdCounter = 1;
  const statusCounts = { '优质': 0, '合格': 0, '待整改': 0, '不合格': 0 };    

  // 获取最近7天的日期
  const today = new Date();
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date);
  }

  // 为每天生成故障数据
  dates.forEach((date, dayIndex) => {
    const dailyCount = dailyFaultCounts[dayIndex];
    
    for (let i = 0; i < dailyCount; i++) {
      // 根据权重选择故障类型
      const rand = Math.random() * 100;
      let cumulativeWeight = 0;
      let selectedType: typeof faultTypes[0] = '设备故障';
      
      for (const [type, weight] of Object.entries(faultTypeWeights)) {
        cumulativeWeight += weight;
        if (rand <= cumulativeWeight) {
          selectedType = type as typeof faultTypes[0];
          break;
        }
      }

      // 选择状态（确保满足分布要求）
      let selectedStatus: typeof statuses[0] = '优质';
      if (statusCounts['优质'] < statusDistribution['优质']) {
        selectedStatus = '优质';
        statusCounts['优质']++;
      } else if (statusCounts['合格'] < statusDistribution['合格']) {
        selectedStatus = '合格';
        statusCounts['合格']++;
      } else if (statusCounts['待整改'] < statusDistribution['待整改']) {
        selectedStatus = '待整改';
        statusCounts['待整改']++;
      } else {
        selectedStatus = '不合格';
        statusCounts['不合格']++;
      }

      // 生成设备ID（SB-ZC-01到SB-ZC-68）
      const equipmentNum = Math.floor(Math.random() * 68) + 1;
      const equipmentId = `SB-ZC-${equipmentNum.toString().padStart(2, '0')}`;

      // 生成持续时间
      const durations = ['2m', '5m', '8m', '10m', '15m', '20m', '30m', '45m', '1h', '2h', '3h'];
      const duration = durations[Math.floor(Math.random() * durations.length)];

      // 生成简洁描述（5个字以内）
      const descriptions = [
        '电机异常', '传感器故障', '通讯中断', '定位偏差', '速度异常',
        '温度过高', '压力不足', '信号丢失', '卡货', '超时',
        '断线', '短路', '过载', '堵塞', '漏油',
        '振动异常', '噪音大', '磨损', '松动', '错位'
      ];
      const description = descriptions[Math.floor(Math.random() * descriptions.length)];

      // 随机选择负责人
      const personInCharge = persons[Math.floor(Math.random() * persons.length)];

      // 格式化时间为"X月X日"
       const timeStr = `${date.getMonth() + 1}月${date.getDate()}日`;

       faults.push({
         id: `F${faultIdCounter.toString().padStart(3, '0')}`,
         equipmentId,
         time: timeStr, // 直接使用格式化的字符串
         type: selectedType,
         description,
         personInCharge,
         duration,
         status: selectedStatus
       });

      faultIdCounter++;
    }
  });

  return faults;
}

export const mockFaultList: fault[] = generateMockFaultData();

/**
 * 业务模拟数据生成函数
 * 生成300条业务数据，满足以下要求：
 * 1. 业务ID从BS-SN-01开始，按序号递增
 * 2. 业务名称在十字以内，涵盖仓储物流各个环节
 * 3. 状态比例随机分配，不均分：已完成占多数，剩余和预实差较少
 */
function generateMockBussinessData(): bussiness[] {
  // 业务名称库（十字以内）
  const bussinessNames = [
    // 入库业务
    '货物入库', '质检入库', '退货入库', '调拨入库', '采购入库',
    '原料入库', '成品入库', '半成品入库', '配件入库', '工具入库',
    
    // 出库业务
    '销售出库', '生产出库', '调拨出库', '退货出库', '报废出库',
    '样品出库', '维修出库', '借用出库', '盘点出库', '紧急出库',
    
    // 库内作业
    '货位调整', '库存盘点', '货物分拣', '包装作业', '标签打印',
    '质量检验', '温度监控', '湿度控制', '安全巡检', '设备维护',
    
    // 运输配送
    '配送任务', '运输调度', '路线规划', '车辆调配', '司机排班',
    '装车作业', '卸车作业', '中转作业', '配送跟踪', '签收确认',
    
    // 订单处理
    '订单接收', '订单审核', '订单分配', '订单拣选', '订单打包',
    '订单发货', '订单跟踪', '订单结算', '退换处理', '客服处理',
    
    // 库存管理
    '库存预警', '补货申请', '库存调拨', '呆滞处理', '损耗统计',
    '安全库存', '周转分析', '库龄管理', '批次管理', '保质期管理',
    
    // 系统作业
    '数据同步', '报表生成', '系统备份', '权限管理', '用户管理',
    '接口对接', '数据清理', '性能优化', '故障处理', '升级维护'
  ];

  // 状态分布权重（随机分配，不均分）
  const statusWeights = {
    '优质': 60,    // 65%
    '合格': 25,      // 25%
    '待整改': 10,     // 10%
    '不合格': 5      // 5%
  };

  const statuses: Array<'优质' | '合格' | '待整改' | '不合格'> = ['优质', '合格', '待整改', '不合格'];
  const bussinessList: bussiness[] = [];

  // 生成300条业务数据
  for (let i = 1; i <= 300; i++) {
    // 生成业务ID：BS-SN-01, BS-SN-02, ...
    const bussinessId = `BS-SN-${i.toString().padStart(2, '0')}`;
    
    // 随机选择业务名称
    const bussinessName = bussinessNames[Math.floor(Math.random() * bussinessNames.length)];
    
    // 根据权重随机选择状态
    const rand = Math.random() * 100;
    let cumulativeWeight = 0;
    let selectedStatus: typeof statuses[0] = '优质';
    
    for (const [status, weight] of Object.entries(statusWeights)) {
      cumulativeWeight += weight;
      if (rand <= cumulativeWeight) {
        selectedStatus = status as typeof statuses[0];
        break;
      }
    }

    bussinessList.push({
      id: bussinessId,
      name: bussinessName,
      status: selectedStatus
    });
  }

  return bussinessList;
}

export const mockBussinessList: bussiness[] = generateMockBussinessData();

/**
 * 点检模拟数据生成函数
 * 生成最近7天的点检数据，满足以下要求：
 * 1. 日期为最近七天
 * 2. 目标数据在50-250之间随机分布
 * 3. 实际数据小于目标数据且差距不超过目标数据的1/3
 * 4. 不同日期的目标和实际数据都不同且随机分布
 */
function generateMockInspectionData(): chartData[] {
  const inspectionData: chartData[] = [];
  
  // 获取最近7天的日期
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // 格式化日期为"MM-DD"格式
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${month}-${day}`;
    
    // 生成目标数据：50-250之间的随机数
    const target = Math.floor(Math.random() * (250 - 50 + 1)) + 50;
    
    // 生成实际数据：小于目标数据且差距不超过目标数据的1/3
    // 实际数据范围：target * 2/3 到 target * 0.95 之间
    const minActual = Math.floor(target * 2/3);
    const maxActual = Math.floor(target * 0.95);
    const actual = Math.floor(Math.random() * (maxActual - minActual + 1)) + minActual;
    
    inspectionData.push({
      date: dateStr,
      target: target,
      actual: actual
    });
  }
  
  return inspectionData;
}

export const mockInspectionData: chartData[] = generateMockInspectionData();

/**
 * 保养模拟数据生成函数
 * 生成最近7天的保养数据，满足以下要求：
 * 1. 日期为最近七天
 * 2. 目标数据在50-250之间随机分布
 * 3. 实际数据小于目标数据且差距不超过目标数据的1/3
 * 4. 不同日期的目标和实际数据都不同且随机分布
 */
function generateMockMaintenanceData(): chartData[] {
  const maintenanceData: chartData[] = [];
  
  // 获取最近7天的日期
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // 格式化日期为"MM-DD"格式
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${month}-${day}`;
    
    // 生成目标数据：50-250之间的随机数
    const target = Math.floor(Math.random() * (250 - 50 + 1)) + 50;
    
    // 生成实际数据：小于目标数据且差距不超过目标数据的1/3
    // 实际数据范围：target * 2/3 到 target * 0.95 之间
    const minActual = Math.floor(target * 2/3);
    const maxActual = Math.floor(target * 0.95);
    const actual = Math.floor(Math.random() * (maxActual - minActual + 1)) + minActual;
    
    maintenanceData.push({
      date: dateStr,
      target: target,
      actual: actual
    });
  }
  
  return maintenanceData;
}

export const mockMaintenanceData: chartData[] = generateMockMaintenanceData();

/**
 * 维修模拟数据生成函数
 * 生成最近7天的维修数据，满足以下要求：
 * 1. 日期为最近七天
 * 2. 目标数据在50-250之间随机分布
 * 3. 实际数据小于目标数据且差距不超过目标数据的1/3
 * 4. 不同日期的目标和实际数据都不同且随机分布
 */
function generateMockRepairData(): chartData[] {
  const repairData: chartData[] = [];
  
  // 获取最近7天的日期
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // 格式化日期为"MM-DD"格式
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${month}-${day}`;
    
    // 生成目标数据：50-250之间的随机数
    const target = Math.floor(Math.random() * (250 - 50 + 1)) + 50;
    
    // 生成实际数据：小于目标数据且差距不超过目标数据的1/3
    // 实际数据范围：target * 2/3 到 target * 0.95 之间
    const minActual = Math.floor(target * 2/3);
    const maxActual = Math.floor(target * 0.95);
    const actual = Math.floor(Math.random() * (maxActual - minActual + 1)) + minActual;
    
    repairData.push({
      date: dateStr,
      target: target,
      actual: actual
    });
  }
  
  return repairData;
}

export const mockRepairData: chartData[] = generateMockRepairData();