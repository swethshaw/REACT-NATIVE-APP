import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export const configureNotificationChannel = async () => {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("alarm", {
      name: "Alarm Notifications",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default", 
      vibrationPattern: [0, 500, 1000],
      lightColor: "#FF231F7C",
      bypassDnd: true,
    });
  }
};

export const scheduleAlarmNotification = async (title, time, sound = "default") => {
  if (!time || new Date(time) < new Date()) return null;

  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "🔔 Alarm Reminder",
        body: `Reminder: ${title}`,
        sound: sound || "default",
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        channelId: "alarm",
        date: new Date(time),
      },
    });

    console.log("Scheduled Alarm Notification:", id);
    return id;
  } catch (error) {
    console.error("Alarm scheduling failed:", error);
    return null;
  }
};

export const cancelAlarmNotification = async (id) => {
  try {
    if (id) {
      await Notifications.cancelScheduledNotificationAsync(id);
      console.log("Cancelled Alarm Notification:", id);
    }
  } catch (error) {
    console.error("Failed to cancel notification:", error);
  }
};
