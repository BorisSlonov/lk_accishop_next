// editInviterAction.js
export type EditInviterActionT = {
  error: boolean;
  message: string;
  data?: { inviter: string };
};

export default async function EditInviterAction(newInviter: string): Promise<EditInviterActionT> {
  // Perform your server request to update the inviter here
  // For example:
  try {
    const response = await fetch('/api/updateMe', {
      method: 'POST',
      body: JSON.stringify({ inviter: newInviter }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: true, message: data.message || 'Something went wrong' };
    }

    return { error: false, message: 'Success', data };
  } catch (error) {
    return { error: true, message:  'Something went wrong' };
  }
}
