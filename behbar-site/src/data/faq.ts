export interface FaqItem {
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'بهبار دقیقاً چه خدماتی ارائه می‌دهد؟',
    questionEn: 'What services does Behbar offer exactly?',
    answer:
      'بهبار امکان ثبت آنلاین درخواست اسباب‌کشی، باربری و حمل بار را در سراسر ایران فراهم می‌کند. خدمات شامل جابه‌جایی با وانت، نیسان، خاور و کامیون، برای منازل مسکونی و همچنین واحدهای تجاری، اداری و انباری است.',
    answerEn:
      'Behbar lets you submit online requests for moving, hauling, and freight services across Iran. Services include moving by pickup, van, light truck, and truck, for residential homes as well as commercial, office, and warehouse units.',
  },
  {
    question: 'هزینه‌ای که پیش از ثبت درخواست نمایش داده می‌شود قطعی است؟',
    questionEn: 'Is the price shown before submitting a request final?',
    answer:
      'خیر. عدد نمایش‌داده‌شده یک برآورد اولیه بر اساس اطلاعاتی است که در فرم وارد می‌کنید. قیمت نهایی پیش از شروع کار با کارشناسان بهبار هماهنگ و تأیید می‌شود.',
    answerEn:
      'No. The number shown is a preliminary estimate based on the information you enter in the form. The final price is confirmed with the Behbar team before the work begins.',
  },
  {
    question: 'چقدر طول می‌کشد تا با من تماس بگیرید؟',
    questionEn: 'How long until you contact me?',
    answer:
      'پس از ثبت درخواست، تیم بهبار در کوتاه‌ترین زمان ممکن با شماره‌ای که وارد کرده‌اید تماس می‌گیرد تا جزئیات کار و زمان دقیق اجرا را هماهنگ کند.',
    answerEn:
      'After you submit a request, the Behbar team calls the number you provided as soon as possible to confirm the details and exact time of the job.',
  },
  {
    question: 'آیا امکان جابه‌جایی بین‌شهری هم وجود دارد؟',
    questionEn: 'Is intercity moving available too?',
    answer:
      'بله. مبدأ و مقصد می‌توانند در دو شهر یا استان متفاوت باشند. در این حالت، برآورد هزینه بر اساس فاصله واقعی بین مبدأ و مقصد محاسبه می‌شود.',
    answerEn:
      'Yes. The origin and destination can be in two different cities or provinces. In that case, the cost estimate is calculated based on the actual distance between them.',
  },
  {
    question: 'اگر طبقه محل من آسانسور نداشته باشد چه می‌شود؟',
    questionEn: "What if my building's floor has no elevator?",
    answer:
      'وضعیت آسانسور و شماره طبقه در فرآیند ثبت درخواست پرسیده می‌شود و در برآورد هزینه لحاظ می‌شود، زیرا حمل بار در طبقات بدون آسانسور معمولاً هزینه بیشتری دارد.',
    answerEn:
      'The elevator status and floor number are asked during the request process and factored into the cost estimate, since carrying loads on floors without an elevator usually costs more.',
  },
  {
    question: 'آیا خدمات بسته‌بندی هم ارائه می‌دهید؟',
    questionEn: 'Do you offer packing services?',
    answer:
      'بله. در فرآیند ثبت درخواست می‌توانید نیاز به خدمات بسته‌بندی را مشخص کنید تا این خدمت به‌عنوان بخشی از برآورد هزینه در نظر گرفته شود.',
    answerEn:
      'Yes. During the request process you can indicate that you need packing services, and it will be factored into the cost estimate.',
  },
  {
    question: 'چگونه می‌توانم وضعیت درخواست خود را پیگیری کنم؟',
    questionEn: 'How can I track the status of my request?',
    answer:
      'از طریق بخش «درخواست‌های من» و با وارد کردن شماره موبایلی که هنگام ثبت درخواست استفاده کرده‌اید، می‌توانید وضعیت سفارش خود را مشاهده کنید.',
    answerEn:
      'Go to the "My Requests" section and enter the mobile number you used when submitting the request to view its status.',
  },
  {
    question: 'آیا می‌توانم زمان درخواست را تغییر دهم یا آن را لغو کنم؟',
    questionEn: 'Can I change the time of my request or cancel it?',
    answer:
      'بله. برای تغییر زمان یا لغو یک درخواست ثبت‌شده کافی است از طریق شماره تماس بهبار با تیم پشتیبانی در ارتباط باشید.',
    answerEn:
      "Yes. To reschedule or cancel a submitted request, simply reach the support team via Behbar's phone number.",
  },
  {
    question: 'برای چه نوع مکان‌هایی می‌توانم درخواست ثبت کنم؟',
    questionEn: 'What types of locations can I submit a request for?',
    answer:
      'در فرآیند ثبت درخواست، نوع مکان مبدأ و مقصد—مسکونی، تجاری، اداری یا انباری—مشخص می‌شود، زیرا این موضوع در نحوه اجرای کار و برآورد هزینه اثرگذار است.',
    answerEn:
      'During the request process, the type of the origin and destination location — residential, commercial, office, or warehouse — is specified, since it affects how the job is carried out and the cost estimate.',
  },
  {
    question: 'آیا اطلاعات من نزد بهبار محفوظ می‌ماند؟',
    questionEn: 'Is my information kept safe by Behbar?',
    answer:
      'بله. اطلاعات ثبت‌شده صرفاً برای هماهنگی و اجرای درخواست شما استفاده می‌شود و در اختیار اشخاص ثالث قرار نمی‌گیرد. جزئیات کامل در صفحه حریم خصوصی درج شده است.',
    answerEn:
      'Yes. The information submitted is used solely to coordinate and carry out your request and is not shared with third parties. Full details are on the privacy page.',
  },
];
