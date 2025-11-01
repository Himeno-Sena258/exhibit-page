import React, { useState } from 'react';
import HeaderBar from '@/components/HeaderBar';
import StackerCraneDashboard from '@/components/stacker-crane-dashboard';
import {
  Sidebar,
  SidebarGroup,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';


const TaskPage: React.FC = () => {
  const [selected, setSelected] = useState<string>('堆垛机');

  const items = ['堆垛机', 'RGV', 'AGV', '机械手', '四向车', '提升机', '托盘输送线'];

  return (
    <div className="w-full min-h-screen flex flex-col">
      <HeaderBar title="顺联仓设备状态中心" />

      <div className="flex-1 relative">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #051641 0%, #041235 50%, #051641 100%)' }}
        />

        {/* 侧边栏 + 右侧面板布局 */}
        <div className="relative z-10 h-[calc(100vh-64px)]">
          <SidebarProvider className="h-full!">
            <Sidebar collapsible="none" className="border-r border-white/10 custom-sidebar">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarMenu>
                    {items.map((label) => (
                      <SidebarMenuItem key={label}>
                        <SidebarMenuButton
                          isActive={selected === label}
                          onClick={() => setSelected(label)}
                          className="bg-transparent hover:bg-transparent active:bg-transparent data-[active=true]:bg-transparent data-[active=true]:underline underline-offset-4 decoration-2 decoration-white text-white"
                        >
                          <span>{label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>

            {/* 右侧预留空白面板区域（按需填充） */}
            <SidebarInset className="relative z-10 p-4 bg-transparent">
              {selected === '堆垛机' ? (
                <StackerCraneDashboard />
              ) : (
                <div className="w-full h-full text-white/80 flex items-center justify-center">
                  请选择左侧设备以查看面板
                </div>
              )}
            </SidebarInset>
          </SidebarProvider>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
