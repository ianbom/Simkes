'use client';

import { Navigation } from '@/Components/partials/Navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Clock,
    Plus,
    User,
} from 'lucide-react';
import { useState } from 'react';

const appointments = [
    {
        id: 1,
        time: '09:00',
        duration: '30 min',
        patient: 'Sarah Johnson',
        type: 'ANC Checkup',
        status: 'confirmed',
        date: '2024-01-15',
    },
    {
        id: 2,
        time: '10:30',
        duration: '45 min',
        patient: 'Michael Chen',
        type: 'Consultation',
        status: 'pending',
        date: '2024-01-15',
    },
    {
        id: 3,
        time: '14:00',
        duration: '30 min',
        patient: 'Emma Wilson',
        type: 'Child Checkup',
        status: 'confirmed',
        date: '2024-01-15',
    },
    {
        id: 4,
        time: '15:30',
        duration: '60 min',
        patient: 'David Rodriguez',
        type: 'Telemedicine',
        status: 'confirmed',
        date: '2024-01-16',
    },
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export default function SchedulePage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState<'calendar' | 'list'>('calendar');

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }

        return days;
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            if (direction === 'prev') {
                newDate.setMonth(prev.getMonth() - 1);
            } else {
                newDate.setMonth(prev.getMonth() + 1);
            }
            return newDate;
        });
    };

    const getAppointmentsForDate = (date: Date) => {
        const dateString = date.toISOString().split('T')[0];
        return appointments.filter((apt) => apt.date === dateString);
    };

    const getTodayAppointments = () => {
        const today = new Date().toISOString().split('T')[0];
        return appointments.filter((apt) => apt.date === today);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'ANC Checkup':
                return 'bg-blue-100 text-blue-800';
            case 'Child Checkup':
                return 'bg-purple-100 text-purple-800';
            case 'Consultation':
                return 'bg-teal-100 text-teal-800';
            case 'Telemedicine':
                return 'bg-indigo-100 text-indigo-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const days = getDaysInMonth(currentDate);
    const todayAppointments = getTodayAppointments();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />

            <main className="container mx-auto max-w-7xl px-4 py-6">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="font-sans text-2xl font-bold text-gray-900">
                            My Schedule
                        </h1>
                        <p className="font-sans text-gray-600">
                            Manage your appointments and calendar
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex rounded-lg border border-gray-200 bg-white p-1">
                            <Button
                                variant={
                                    view === 'calendar' ? 'default' : 'ghost'
                                }
                                size="sm"
                                onClick={() => setView('calendar')}
                                className="text-sm"
                            >
                                <CalendarDays className="mr-1 h-4 w-4" />
                                Calendar
                            </Button>
                            <Button
                                variant={view === 'list' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setView('list')}
                                className="text-sm"
                            >
                                <Clock className="mr-1 h-4 w-4" />
                                List
                            </Button>
                        </div>

                        <Button className="bg-primary hover:bg-primary/90">
                            <Plus className="mr-2 h-4 w-4" />
                            New Appointment
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                    {/* Calendar/List View */}
                    <div className="lg:col-span-3">
                        {view === 'calendar' ? (
                            <Card>
                                <CardHeader className="pb-4">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="font-sans text-lg font-semibold">
                                            {months[currentDate.getMonth()]}{' '}
                                            {currentDate.getFullYear()}
                                        </CardTitle>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    navigateMonth('prev')
                                                }
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    setCurrentDate(new Date())
                                                }
                                            >
                                                Today
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    navigateMonth('next')
                                                }
                                            >
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {/* Calendar Grid */}
                                    <div className="mb-4 grid grid-cols-7 gap-1">
                                        {daysOfWeek.map((day) => (
                                            <div
                                                key={day}
                                                className="p-2 text-center font-sans text-sm font-medium text-gray-500"
                                            >
                                                {day}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-7 gap-1">
                                        {days.map((day, index) => {
                                            if (!day) {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="h-24 p-2"
                                                    ></div>
                                                );
                                            }

                                            const dayAppointments =
                                                getAppointmentsForDate(day);
                                            const isToday =
                                                day.toDateString() ===
                                                new Date().toDateString();
                                            const isSelected =
                                                day.toDateString() ===
                                                selectedDate.toDateString();

                                            return (
                                                <div
                                                    key={index}
                                                    className={`h-24 cursor-pointer border border-gray-100 p-2 transition-colors hover:bg-gray-50 ${
                                                        isToday
                                                            ? 'border-primary/20 bg-primary/5'
                                                            : ''
                                                    } ${isSelected ? 'border-primary/30 bg-primary/10' : ''}`}
                                                    onClick={() =>
                                                        setSelectedDate(day)
                                                    }
                                                >
                                                    <div
                                                        className={`mb-1 font-sans text-sm font-medium ${
                                                            isToday
                                                                ? 'text-primary'
                                                                : 'text-gray-900'
                                                        }`}
                                                    >
                                                        {day.getDate()}
                                                    </div>
                                                    <div className="space-y-1">
                                                        {dayAppointments
                                                            .slice(0, 2)
                                                            .map((apt) => (
                                                                <div
                                                                    key={apt.id}
                                                                    className="truncate rounded bg-primary/10 px-1 py-0.5 font-sans text-xs text-primary"
                                                                >
                                                                    {apt.time}{' '}
                                                                    {
                                                                        apt.patient.split(
                                                                            ' ',
                                                                        )[0]
                                                                    }
                                                                </div>
                                                            ))}
                                                        {dayAppointments.length >
                                                            2 && (
                                                            <div className="font-sans text-xs text-gray-500">
                                                                +
                                                                {dayAppointments.length -
                                                                    2}{' '}
                                                                more
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-sans">
                                        All Appointments
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {appointments.map((appointment) => (
                                            <div
                                                key={appointment.id}
                                                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="text-center">
                                                        <div className="font-sans text-sm font-medium text-gray-900">
                                                            {new Date(
                                                                appointment.date,
                                                            ).toLocaleDateString(
                                                                'en-US',
                                                                {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                },
                                                            )}
                                                        </div>
                                                        <div className="font-sans text-xs text-gray-500">
                                                            {appointment.time}
                                                        </div>
                                                    </div>

                                                    <div className="flex-1">
                                                        <div className="mb-1 flex items-center gap-2">
                                                            <h3 className="font-sans font-medium text-gray-900">
                                                                {
                                                                    appointment.patient
                                                                }
                                                            </h3>
                                                            <Badge
                                                                className={getTypeColor(
                                                                    appointment.type,
                                                                )}
                                                            >
                                                                {
                                                                    appointment.type
                                                                }
                                                            </Badge>
                                                        </div>
                                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                                            <span className="flex items-center gap-1 font-sans">
                                                                <Clock className="h-3 w-3" />
                                                                {
                                                                    appointment.duration
                                                                }
                                                            </span>
                                                            <Badge
                                                                className={getStatusColor(
                                                                    appointment.status,
                                                                )}
                                                            >
                                                                {
                                                                    appointment.status
                                                                }
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    View Details
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Today's Schedule Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-sans text-lg font-semibold">
                                    Today's Schedule
                                </CardTitle>
                                <p className="font-sans text-sm text-gray-600">
                                    {new Date().toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </CardHeader>
                            <CardContent>
                                {todayAppointments.length > 0 ? (
                                    <div className="space-y-3">
                                        {todayAppointments.map(
                                            (appointment) => (
                                                <div
                                                    key={appointment.id}
                                                    className="rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50"
                                                >
                                                    <div className="mb-2 flex items-center justify-between">
                                                        <span className="font-sans text-sm font-medium text-primary">
                                                            {appointment.time}
                                                        </span>
                                                        <Badge
                                                            className={getStatusColor(
                                                                appointment.status,
                                                            )}
                                                        >
                                                            {appointment.status}
                                                        </Badge>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <User className="h-3 w-3 text-gray-400" />
                                                            <span className="font-sans text-sm text-gray-900">
                                                                {
                                                                    appointment.patient
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="h-3 w-3 text-gray-400" />
                                                            <span className="font-sans text-xs text-gray-600">
                                                                {
                                                                    appointment.type
                                                                }{' '}
                                                                •{' '}
                                                                {
                                                                    appointment.duration
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                ) : (
                                    <div className="py-6 text-center">
                                        <CalendarDays className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                                        <p className="font-sans text-sm text-gray-500">
                                            No appointments today
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Quick Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-sans text-lg font-semibold">
                                    Quick Stats
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="font-sans text-sm text-gray-600">
                                            Today's Appointments
                                        </span>
                                        <span className="font-sans font-medium text-gray-900">
                                            {todayAppointments.length}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-sans text-sm text-gray-600">
                                            This Week
                                        </span>
                                        <span className="font-sans font-medium text-gray-900">
                                            12
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-sans text-sm text-gray-600">
                                            Pending Confirmations
                                        </span>
                                        <span className="font-sans font-medium text-yellow-600">
                                            3
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-sans text-sm text-gray-600">
                                            Completed Today
                                        </span>
                                        <span className="font-sans font-medium text-green-600">
                                            2
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
