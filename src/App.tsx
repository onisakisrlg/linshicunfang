import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronUp, ChevronDown, Search, RefreshCw, Clock, Box } from 'lucide-react';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [tempBoxCodeInput, setTempBoxCodeInput] = useState('');
  const [confirmedBoxCode, setConfirmedBoxCode] = useState('');
  const trackingNumberInputRef = useRef<HTMLInputElement>(null);

  const handleConfirmBox = () => {
    if (tempBoxCodeInput.trim()) {
      setConfirmedBoxCode(tempBoxCodeInput.trim());
      setIsModalOpen(false);
      setTimeout(() => {
        trackingNumberInputRef.current?.focus();
      }, 0);
    }
  };

  const handleLargeItem = () => {
    setConfirmedBoxCode('无临时框');
    setTempBoxCodeInput('');
    setIsModalOpen(false);
    setTimeout(() => {
      trackingNumberInputRef.current?.focus();
    }, 0);
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans text-[14px] text-[#333]">
      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center">
          <div className="bg-white rounded-[4px] shadow-xl w-[420px] p-8 transform transition-all">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Box className="w-6 h-6 text-[#1890ff]" />
              </div>
              <h3 className="text-[16px] font-medium text-[#333] mb-6 text-center">请扫描临时框编码开始放入</h3>
              <input
                type="text"
                value={tempBoxCodeInput}
                onChange={(e) => setTempBoxCodeInput(e.target.value)}
                placeholder="例如: LS-00000001"
                className="w-full border border-[#d9d9d9] rounded-[2px] px-3 h-[36px] text-[14px] focus:outline-none focus:border-[#1890ff] focus:shadow-[0_0_0_2px_rgba(24,144,255,0.2)] transition-all mb-6 text-center"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleConfirmBox()}
              />
              <div className="flex space-x-3 w-full">
                <button
                  onClick={handleLargeItem}
                  className="flex-1 h-[36px] rounded-[2px] text-[14px] transition-colors shadow-sm bg-white border border-[#d9d9d9] text-[#666] hover:text-[#1890ff] hover:border-[#1890ff]"
                >
                  无临时框
                </button>
                <button
                  onClick={handleConfirmBox}
                  disabled={!tempBoxCodeInput.trim()}
                  className={`flex-1 h-[36px] rounded-[2px] text-[14px] transition-colors shadow-sm ${
                    tempBoxCodeInput.trim() 
                      ? 'bg-[#1890ff] hover:bg-[#40a9ff] text-white' 
                      : 'bg-[#f5f5f5] text-[#b8b8b8] border border-[#d9d9d9] cursor-not-allowed'
                  }`}
                >
                  确定
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Stepper */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex justify-center items-center h-14 space-x-12">
            <div className="flex items-center text-[#1890ff]">
              <div className="w-4 h-4 rounded-full border-[1.5px] border-[#1890ff] flex items-center justify-center mr-2">
              </div>
              <span className="font-medium text-[15px]">选择关联订单</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" strokeWidth={1.5} />
            <div className="flex items-center text-gray-400">
              <div className="w-4 h-4 rounded-full border-[1.5px] border-gray-300 flex items-center justify-center mr-2">
              </div>
              <span className="font-medium text-[15px]">完善商品信息</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-4">
        
        {/* Confirmed Box Code Banner */}
        {confirmedBoxCode && (
          <div className="bg-[#e6f7ff] border border-[#91d5ff] px-4 py-2.5 rounded-[2px] flex items-center shadow-sm">
            <Box className="w-4 h-4 text-[#1890ff] mr-2" />
            <span className="text-[#333] text-[14px]">当前临时区域：</span>
            <span className="text-[#1890ff] text-[15px] font-bold tracking-wide">
              {confirmedBoxCode === '无临时框' ? '无临时框' : confirmedBoxCode}
            </span>
            <button 
              onClick={() => {
                setTempBoxCodeInput('');
                setIsModalOpen(true);
              }}
              className="ml-auto text-[#1890ff] hover:text-blue-600 text-[13px] underline underline-offset-2"
            >
              开始新存放
            </button>
          </div>
        )}

        {/* Search Card */}
        <div className="bg-white rounded-[2px] shadow-sm border border-[#f0f0f0]">
          <div className="px-6 py-3.5 border-b border-[#f0f0f0] flex justify-between items-center">
            <h2 className="text-[15px] font-semibold text-[#333]">入库关联订单</h2>
            <button className="flex items-center text-[#1890ff] hover:text-blue-600 text-[13px] transition-colors">
              收起搜索 <ChevronUp className="w-4 h-4 ml-0.5" />
            </button>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-x-4 gap-y-4 items-center">
              
              <input type="text" placeholder="mid" className="border border-[#d9d9d9] rounded-[2px] px-3 h-[32px] w-[160px] text-[13px] placeholder:text-[#bfbfbf] focus:outline-none focus:border-[#1890ff] focus:shadow-[0_0_0_2px_rgba(24,144,255,0.2)] transition-all" />
              <input ref={trackingNumberInputRef} type="text" placeholder="快递单号" className="border border-[#d9d9d9] rounded-[2px] px-3 h-[32px] w-[160px] text-[13px] placeholder:text-[#bfbfbf] focus:outline-none focus:border-[#1890ff] focus:shadow-[0_0_0_2px_rgba(24,144,255,0.2)] transition-all" />
              
              <div className="flex items-center border border-[#d9d9d9] rounded-[2px] px-3 h-[32px] bg-white">
                <span className="mr-2 text-[#666] text-[13px]">关</span>
                <div className="relative inline-block w-9 h-[18px] bg-[#1890ff] rounded-full cursor-pointer transition-colors">
                  <div className="absolute left-[2px] top-[2px] w-[14px] h-[14px] bg-white rounded-full transition-transform transform translate-x-[18px] shadow-sm"></div>
                </div>
                <span className="ml-2 text-[#1890ff] text-[13px]">验</span>
              </div>

              <input type="text" placeholder="平台单号" className="border border-[#d9d9d9] rounded-[2px] px-3 h-[32px] w-[160px] text-[13px] placeholder:text-[#bfbfbf] focus:outline-none focus:border-[#1890ff] focus:shadow-[0_0_0_2px_rgba(24,144,255,0.2)] transition-all" />
              
              <div className="relative">
                <select className="border border-[#d9d9d9] rounded-[2px] px-3 h-[32px] w-[160px] text-[13px] text-[#bfbfbf] focus:outline-none focus:border-[#1890ff] focus:shadow-[0_0_0_2px_rgba(24,144,255,0.2)] appearance-none bg-white transition-all">
                  <option value="">标签</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#bfbfbf] absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>

              <input type="text" placeholder="卖家ID" className="border border-[#d9d9d9] rounded-[2px] px-3 h-[32px] w-[160px] text-[13px] placeholder:text-[#bfbfbf] focus:outline-none focus:border-[#1890ff] focus:shadow-[0_0_0_2px_rgba(24,144,255,0.2)] transition-all" />
              <input type="text" placeholder="入库ID" className="border border-[#d9d9d9] rounded-[2px] px-3 h-[32px] w-[160px] text-[13px] placeholder:text-[#bfbfbf] focus:outline-none focus:border-[#1890ff] focus:shadow-[0_0_0_2px_rgba(24,144,255,0.2)] transition-all" />

              <input type="text" placeholder="购买账号" className="border border-[#d9d9d9] rounded-[2px] px-3 h-[32px] w-[160px] text-[13px] placeholder:text-[#bfbfbf] focus:outline-none focus:border-[#1890ff] focus:shadow-[0_0_0_2px_rgba(24,144,255,0.2)] transition-all" />
              <input type="text" placeholder="商品名称" className="border border-[#d9d9d9] rounded-[2px] px-3 h-[32px] w-[160px] text-[13px] placeholder:text-[#bfbfbf] focus:outline-none focus:border-[#1890ff] focus:shadow-[0_0_0_2px_rgba(24,144,255,0.2)] transition-all" />
              
              <div className="flex items-center border border-[#d9d9d9] rounded-[2px] px-3 h-[32px] w-[280px] bg-white focus-within:border-[#1890ff] focus-within:shadow-[0_0_0_2px_rgba(24,144,255,0.2)] transition-all">
                <Clock className="w-4 h-4 text-[#bfbfbf] mr-2" />
                <input type="text" placeholder="开始" className="w-full text-[13px] focus:outline-none text-center placeholder:text-[#bfbfbf]" />
                <span className="text-[#bfbfbf] mx-2">-</span>
                <input type="text" placeholder="结束" className="w-full text-[13px] focus:outline-none text-center placeholder:text-[#bfbfbf]" />
              </div>

              <div className="flex items-center ml-2">
                <span className="mr-3 text-[#333] font-medium text-[14px]">平台</span>
                <div className="relative">
                  <select className="border border-[#d9d9d9] rounded-[2px] px-3 h-[32px] w-[100px] text-[13px] text-[#333] focus:outline-none focus:border-[#1890ff] focus:shadow-[0_0_0_2px_rgba(24,144,255,0.2)] appearance-none bg-white transition-all">
                    <option value="all">全部</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#bfbfbf] absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-auto">
                <button className="bg-[#1890ff] hover:bg-[#40a9ff] text-white px-4 h-[32px] rounded-[2px] flex items-center justify-center text-[13px] transition-colors shadow-sm">
                  <Search className="w-3.5 h-3.5 mr-1.5" /> 搜索
                </button>
                <button className="bg-white border border-[#d9d9d9] hover:text-[#1890ff] hover:border-[#1890ff] text-[#333] px-4 h-[32px] rounded-[2px] flex items-center justify-center text-[13px] transition-colors shadow-sm group">
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-[#666] group-hover:text-[#1890ff]" /> 重置
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-[2px] shadow-sm border border-[#f0f0f0]">
          <div className="px-6 py-3.5 border-b border-[#f0f0f0] flex justify-between items-center">
            <h2 className="text-[15px] font-semibold text-[#333]">最近成功入库记录 (自动刷新)</h2>
            <button className="text-[#1890ff] hover:text-blue-600 text-[13px] transition-colors">
              手动刷新
            </button>
          </div>
          
          <div className="p-6">
            <div className="border border-[#f0f0f0] rounded-[2px] overflow-x-auto">
              <table className="w-full min-w-[1100px] text-left border-collapse">
                <thead className="bg-[#fafafa]">
                  <tr>
                    <th className="py-3.5 px-4 font-medium text-[#333] border-b border-r border-[#f0f0f0] text-center w-16 text-[13px]">ID</th>
                    <th className="py-3.5 px-4 font-medium text-[#333] border-b border-r border-[#f0f0f0] text-center text-[13px]">入库员</th>
                    <th className="py-3.5 px-4 font-medium text-[#333] border-b border-r border-[#f0f0f0] text-center text-[13px]">商品MID</th>
                    <th className="py-3.5 px-4 font-medium text-[#333] border-b border-r border-[#f0f0f0] text-center w-48 text-[13px]">MID/商品名称</th>
                    <th className="py-3.5 px-4 font-medium text-[#333] border-b border-r border-[#f0f0f0] text-center text-[13px]">商品图片</th>
                    <th className="py-3.5 px-4 font-medium text-[#333] border-b border-r border-[#f0f0f0] text-center text-[13px]">入库图片</th>
                    <th className="py-3.5 px-4 font-medium text-[#333] border-b border-r border-[#f0f0f0] text-center text-[13px]">会员ID</th>
                    <th className="py-3.5 px-4 font-medium text-[#333] border-b border-r border-[#f0f0f0] text-center text-[13px]">卖家快递单号</th>
                    <th className="py-3.5 px-4 font-medium text-[#333] border-b border-r border-[#f0f0f0] text-center text-[13px]">到付金额</th>
                    <th className="py-3.5 px-4 font-medium text-[#333] border-b border-[#f0f0f0] text-center text-[13px]">商品重量/克</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={10} className="py-16 text-center text-[#999] text-[13px] border-b border-[#f0f0f0]">
                      暂无数据
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Custom Scrollbar visual representation */}
            <div className="mt-4 flex items-center text-[#888]">
              <div className="w-0 h-0 border-t-[5px] border-t-transparent border-r-[6px] border-r-current border-b-[5px] border-b-transparent"></div>
              <div className="h-[10px] bg-[#888] rounded-full w-[70%] mx-2"></div>
              <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[6px] border-l-current border-b-[5px] border-b-transparent"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
