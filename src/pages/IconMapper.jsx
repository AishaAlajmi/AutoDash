import {
  Users, UserCheck, UserX, DollarSign, Clipboard, Activity,
  BarChart2, PieChart, LineChart, Table, FileText, Search,
  TrendingUp, TrendingDown, Clock, MapPin, Tag, Briefcase,
  Layers, Package, CreditCard, ShoppingCart
} from 'lucide-react';
import React, { useState, useEffect, useRef } from "react";

const iconMap = {
  // General
  'total': Users,
  'records': FileText,
  'count': Clipboard,
  'unique': Layers,
  'summary': Search,
  'metrics': Table,
  'trends': TrendingUp,
  'analysis': Activity,
  // HR related
  'employees': Users,
  'staff': Users,
  'salary': DollarSign,
  'salaries': DollarSign,
  'payroll': DollarSign,
  'department': Briefcase,
  'job': Briefcase,
  'terminated': UserX,
  'active': UserCheck,
  // Sales/Finance related
  'sales': ShoppingCart,
  'revenue': DollarSign,
  'profit': DollarSign,
  'orders': ShoppingCart,
  'cost': DollarSign,
  'price': DollarSign,
  'channel': Tag,
  'region': MapPin,
  'expense': CreditCard,
  // Time/Date related
  'date': Clock,
  'month': Clock,
  'year': Clock,
  'time': Clock,
  // Other
  'product': Package,
  'category': Tag,
  'status': TrendingUp
};

export function getDynamicIcon(title) {
  const normalizedTitle = title.toLowerCase();
  for (const keyword in iconMap) {
    if (normalizedTitle.includes(keyword)) {
      const IconComponent = iconMap[keyword];
      return <IconComponent size={24} />;
    }
  }
  // Default fallback icon if no keyword matches
  return <Activity size={24} />;
}