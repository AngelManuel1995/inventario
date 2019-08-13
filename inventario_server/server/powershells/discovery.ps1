param (
    [Parameter(Mandatory = $true)]
    $ip
)

$StrComputer=$ip    
              
$GenItems1 = gwmi Win32_ComputerSystem -Comp $StrComputer
$GenItems2 = gwmi Win32_OperatingSystem -Comp $StrComputer
$SysItems1 = gwmi Win32_BIOS -Comp $StrComputer
$SysItems2 = gwmi Win32_TimeZone -Comp $StrComputer
$SysItems3 = gwmi Win32_WmiSetting -Comp $StrComputer
$ProcItems1 = gwmi Win32_Processor -Comp $StrComputer
$MemItems1 = gwmi Win32_PhysicalMemory -Comp $StrComputer
$memItems2 = gwmi Win32_PhysicalMemoryArray -Comp $StrComputer
$DiskItems = gwmi Win32_LogicalDisk -Comp $StrComputer
$NetItems = gwmi Win32_NetworkAdapterConfiguration -Comp $StrComputer |`
where{$_.IPEnabled -eq "True"}
# ==============================================================================================
#  'Portatil' - Obtiene los datos a para ser exportados en excel
# ==============================================================================================
                     $computer = $StrComputer

                     $isLaptop = $false
                     if(Get-WmiObject -Class win32_systemenclosure -ComputerName $computer | 
                        Where-Object { $_.chassistypes -eq 9 -or $_.chassistypes -eq 10 `
                        -or $_.chassistypes -eq 14})
                       { $isLaptop = $true } 
                     if(Get-WmiObject -Class win32_battery -ComputerName $computer) 
                       { $isLaptop = $true }
                     If($isLaptop) { $tipo="Portatil" }
                    else { $tipo="Escritorio"}

                                                                               

# ==============================================================================================
# 'Placa' - Obtiene los datos a para ser exportados en excel elimina la w o la P
# ==============================================================================================


          
            $line = echo $GenItems1.Name
          

# ==============================================================================================
# 'velocidad procesador' - Obtiene los datos a para ser exportados en excel
# ==============================================================================================

                        $velocidad = $ProcItems1.name
                        $velocidad = $velocidad.Substring($velocidad.get_Length()-8)
## ==============================================================================================
# 'Cantidad Memoria Ram' - Obtiene los datos a para ser exportados en excel
# ==============================================================================================
                        $computer = $StrComputer

                         $PhysicalRAM = (Get-WMIObject -class Win32_PhysicalMemory -ComputerName $Computer |
                        Measure-Object -Property capacity -Sum | % {[Math]::Round(($_.sum / 1GB),2)})

                        $memoria = -join $PhysicalRAM + " " + "GB"

# ==============================================================================================
# 'Disco Duro' - Obtiene los datos a para ser exportados en excel
# ==============================================================================================

                             $disco=Get-WmiObject Win32_DiskDrive -computername $StrComputer |  Where-Object -FilterScript {$_.DeviceID -Eq "\\.\PHYSICALDRIVE0"}  |
                             Measure-Object -Property size -Sum | % {[Math]::Round(($_.sum / 1GB))}
                             $lookupTable = @{
                                            "119" = "128 GB"
                                            "149" = "160 GB"
                                            "699" = "720 GB"
                                             
                                            "298" = "320 GB"
                                            "932" = "1 TB"
                                            "466" = "500 GB"
                                             }


                                         $lookupTable.GetEnumerator() | ForEach-Object {
                                         if ($disco -match $_.Key)
                                            {
                                            $disco = $disco -replace $_.Key, $_.Value
                                            }
                                                                                        }
# ==============================================================================================
# 'serial monitor' 
# ==============================================================================================

#Lista de CÃ³digos de FabricaciÃ³n que se podrÃ­an extraer de WMI y sus respectivos nombres completos. Se utiliza para traducir mÃ¡s tarde.
  $ManufacturerHash = @{ 
    "AAC" =	"AcerView";
    "ACR" = "Acer";
    "AOC" = "AOC";
    "AIC" = "AG Neovo";
    "APP" = "Apple Computer";
    "AST" = "AST Research";
    "AUO" = "Equipo Portatil";
    "BNQ" = "BenQ";
    "CMO" = "Acer";
    "CPL" = "Compal";
    "CPQ" = "Compaq";
    "CPT" = "Chunghwa Pciture Tubes, Ltd.";
    "CTX" = "CTX";
    "DEC" = "DEC";
    "DEL" = "Dell";
    "DPC" = "Delta";
    "DWE" = "Daewoo";
    "EIZ" = "EIZO";
    "ELS" = "ELSA";
    "ENC" = "EIZO";
    "EPI" = "Envision";
    "FCM" = "Funai";
    "FUJ" = "Fujitsu";
    "FUS" = "Fujitsu-Siemens";
    "GSM" = "LG Electronics";
    "GWY" = "Gateway 2000";
    "HEI" = "Hyundai";
    "HIT" = "Hyundai";
    "HSL" = "Hansol";
    "HTC" = "Hitachi/Nissei";
    "HWP" = "HP";
    "IBM" = "IBM";
    "ICL" = "Fujitsu ICL";
    "IVM" = "Iiyama";
    "KDS" = "Korea Data Systems";
    "LEN" = "Lenovo";
    "LGD" = "Asus";
    "LPL" = "Fujitsu";
    "MAX" = "Belinea"; 
    "MEI" = "Panasonic";
    "MEL" = "Mitsubishi Electronics";
    "MS_" = "Panasonic";
    "NAN" = "Nanao";
    "NEC" = "NEC";
    "NOK" = "Nokia Data";
    "NVD" = "Fujitsu";
    "OPT" = "Optoma";
    "PHL" = "Philips";
    "REL" = "Relisys";
    "SAN" = "Samsung";
    "SAM" = "Samsung";
    "SBI" = "Smarttech";
    "SGI" = "SGI";
    "SNY" = "Sony";
    "SRC" = "Shamrock";
    "SUN" = "Sun Microsystems";
    "SEC" = "Hewlett-Packard";
    "TAT" = "Tatung";
    "TOS" = "Toshiba";
    "TSB" = "Toshiba";
    "VSC" = "ViewSonic";
    "ZCM" = "Zenith";
    "UNK" = "Unknown";
    "_YV" = "Fujitsu";
      }
      
  
  
  
    #Grabs the Monitor objects from WMI
    $Monitors = Get-WmiObject -Namespace "root\WMI" -Class "WMIMonitorID" -ComputerName $Computer -ErrorAction SilentlyContinue
    
    #Creates an empty array to hold the data
    $Monitor_Array = @()
    
    
    #Takes each monitor object found and runs the following code:
    ForEach ($Monitor in $Monitors) {
      
      #Grabs respective data and converts it from ASCII encoding and removes any trailing ASCII null values
      #If ([System.Text.Encoding]::ASCII.GetString($Monitor.UserFriendlyName) -ne $null) {
      #  $Mon_Model = ([System.Text.Encoding]::ASCII.GetString($Monitor.UserFriendlyName)).Replace("$([char]0x0000)","")
      #} else {
      #  $Mon_Model = $null
      #}
      $Mon_Serial_Number = ([System.Text.Encoding]::ASCII.GetString($Monitor.SerialNumberID)).Replace("$([char]0x0000)","")
      $Mon_Attached_Computer = ($Monitor.PSComputerName).Replace("$([char]0x0000)","")
      $Mon_Manufacturer = ([System.Text.Encoding]::ASCII.GetString($Monitor.ManufacturerName)).Replace("$([char]0x0000)","")
      
      #Filters out "non monitors". Place any of your own filters here. These two are all-in-one computers with built in displays. I don't need the info from these.
      If ($Mon_Model -like "*800 AIO*" -or $Mon_Model -like "*8300 AiO*") {Break}
      
      #Sets a friendly name based on the hash table above. If no entry found sets it to the original 3 character code
      $Mon_Manufacturer_Friendly = $ManufacturerHash.$Mon_Manufacturer
      If ($Mon_Manufacturer_Friendly -eq $null) {
        $Mon_Manufacturer_Friendly = $Mon_Manufacturer
      }
      
      #Creates a custom monitor object and fills it with 4 NoteProperty members and the respective data
      $Monitor_Obj = [PSCustomObject]@{
        Manufacturer     = $Mon_Manufacturer_Friendly
        Model            = $Mon_Model
        SerialNumber     = $Mon_Serial_Number
        AttachedComputer = $Mon_Attached_Computer
      }
      
      #Appends the object to the array
      $Monitor_Array += $Monitor_Obj

    } #End ForEach Monitor
  
    #Outputs the Array
   
    
# ==============================================================================================
# 'Obtener datos de red Usuario y demas' 
# ==============================================================================================
$cedula=""
$strSID=""
$Name=""


$strSID = Get-WmiObject -Class  win32_computersystem  -ComputerName $computer | Select-Object -ExpandProperty username
 
$strSID = $strSID.split("\") | select-object -last 1






 $fecha=Get-Date -format dd-MMMM-yyyy
 Switch($GenItems1.DomainRole)
{
0{$comunicacion= "Stand Alone Workstation"}
1{$comunicacion= "Member Workstation"}
2{$comunicacion= "Stand Alone Server"}
3{$comunicacion= "Member Server"}
4{$comunicacion= "Back-up Domain Controller"}
5{$comunicacion= "Primary Domain Controller"}
default{$comunicacion="Undetermined Domain Role"}
}



@{
usurario=$strSID
type=$tipo
name=$GenItems1.Name
brand=$GenItems1.Manufacturer
model=$GenItems1.Model
ramMemory=$memoria
hardDisk=$disco
operatingSystem=$GenItems2.Caption
processor=$ProcItems1.Name
serie=$SysItems1.SerialNumber
netdesc=$NetItems.description[0]
macAddress=$NetItems.MACAddress[0]
ip=$NetItems.IPAddress[0]
monitor=$Monitor_Array.manufacturer
monitorodel=$Monitor_Array.model
} | ConvertTo-Json -Compress